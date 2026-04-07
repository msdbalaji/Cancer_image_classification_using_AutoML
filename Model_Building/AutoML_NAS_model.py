import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
from kerastuner.tuners import Hyperband
from tensorflow.keras.callbacks import EarlyStopping
import matplotlib.pyplot as plt

seed = 42
np.random.seed(seed)
tf.random.set_seed(seed)

DATASET_DIR = "D:\\Capstone-project\\data"
IMG_HEIGHT = 128
IMG_WIDTH = 128
BATCH_SIZE = 32

datagen = ImageDataGenerator(
    rescale=1.0 / 255,
    validation_split=0.2
)

train_data = datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(IMG_HEIGHT, IMG_WIDTH),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training',
    shuffle=True
)

val_data = datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(IMG_HEIGHT, IMG_WIDTH),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

def build_model(hp):
    model = Sequential()
    model.add(Conv2D(
        filters=hp.Int('conv_1_filter', min_value=32, max_value=128, step=16),
        kernel_size=hp.Choice('conv_1_kernel', values=[3, 5]),
        activation='relu',
        input_shape=(IMG_HEIGHT, IMG_WIDTH, 3)
    ))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(BatchNormalization())

    for i in range(hp.Int('num_conv_layers', 1, 3)):
        model.add(Conv2D(
            filters=hp.Int(f'conv_{i+2}_filter', min_value=32, max_value=128, step=16),
            kernel_size=hp.Choice(f'conv_{i+2}_kernel', values=[3, 5]),
            activation='relu'
        ))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(BatchNormalization())

    model.add(Flatten())
    model.add(Dense(
        units=hp.Int('dense_units', min_value=64, max_value=256, step=32),
        activation='relu'
    ))
    model.add(Dropout(rate=hp.Float('dropout_rate', min_value=0.2, max_value=0.5, step=0.1)))
    model.add(Dense(train_data.num_classes, activation='softmax'))

    model.compile(
        optimizer=Adam(learning_rate=hp.Choice('learning_rate', values=[1e-2, 1e-3, 1e-4])),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    return model

tuner = Hyperband(
    build_model,
    objective='val_accuracy',
    max_epochs=10,
    factor=3,
    directory='tuner_results',
    project_name='lung_cancer_nas'
)

tuner.search_space_summary()

early_stop = EarlyStopping(monitor='val_loss', patience=3)

tuner.search(train_data, validation_data=val_data, epochs=10, callbacks=[early_stop])

best_model = tuner.get_best_models(num_models=1)[0]
best_model.summary()

history = best_model.fit(
    train_data,
    validation_data=val_data,
    epochs=10,
    callbacks=[early_stop]
)

best_model.save("lung_cancer_nas_model.h5")

loss, acc = best_model.evaluate(val_data)
print(f"\n NAS Model Accuracy on Validation Set: {acc * 100:.2f}%")

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('NAS Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('NAS Model Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.savefig("nas_model_training_plot.png")
print("Training completed. Plot saved as nas_model_training_plot.png")
