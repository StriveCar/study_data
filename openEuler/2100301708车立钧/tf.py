import os
import tensorflow as tf
from keras.optimizers import Adam
from keras.utils import image_utils
from keras.preprocessing.image import ImageDataGenerator
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import numpy as np

base_dir ='./data'
train_dir = os. path. join(base_dir,'train' )
validation_dir = os. path. join(base_dir,'validation')
#训练集
train_cats_dir = os. path. join(train_dir,'cat')
train_dogs_dir = os. path. join(train_dir,'dog' )
#验证集
validation_cats_dir = os. path. join(validation_dir,'cat')
validation_dogs_dir = os. path. join(validation_dir, 'dog' )


model = tf.keras.models.Sequential([
#如果训练慢，可以把数据设置的更小一些
tf. keras. layers. Conv2D(32,(3, 3),activation='relu',input_shape=(64,64,3)),
tf. keras. layers. MaxPooling2D(2,2),
tf. keras. layers. Conv2D(64,(3, 3),activation='relu' ),
tf. keras. layers. MaxPooling2D(2, 2),
tf. keras. layers. Conv2D(128,(3, 3),activation='relu' ),
tf. keras. layers. MaxPooling2D(2, 2),
#为全连接层准备
tf. keras. layers. Flatten(),
tf. keras. layers. Dense(512,activation='relu' ),
tf. keras. layers. Dropout(0.4),
#二分类sigmoid就够了
tf. keras. layers. Dense(1,activation='sigmoid' ),
])

model.summary()

print('total train cat images :', len(os.listdir(train_cats_dir)))
print('total train dog images :', len(os.listdir(train_dogs_dir)))

print('total validation cat images :', len(os.listdir(validation_cats_dir)))
print('total validation dog images :', len(os.listdir(validation_dogs_dir)))

#训练器
model.compile (loss='binary_crossentropy',
                optimizer=Adam(learning_rate=0.0001),
                metrics=['acc'])

train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=30,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest')

test_datagen = ImageDataGenerator (rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    train_dir, # 文件夹路径
    target_size=(64,64),# 指定resize成的大小
    batch_size=20,
    #如果one-hot就是categorical, |F 二分类用binary就可以
    class_mode='binary' )

validation_generator = test_datagen.flow_from_directory (
    validation_dir,
    target_size=(64,64),
    batch_size=20,
    class_mode='binary')

#训练网络模型
history = model.fit(
    train_generator,
    steps_per_epoch=70,
    epochs=50,
    validation_data=validation_generator,
    validation_steps=35,
    verbose=2
)

import matplotlib.pyplot as plt

acc = history. history['acc']
val_acc = history. history['val_acc']
loss = history. history['loss']
val_loss = history. history['val_loss']
epochs = range(len (acc))

plt. plot (epochs,acc,'r',label='Training accuracy',linestyle='-',marker='*')
plt. plot (epochs,val_acc,'b',label='Validation accuracy',linestyle='-',marker='*')
plt. title('Training and validation accuracy')

f = plt.gcf()
f.savefig('./data/result/accuracy.png')
f.clear()

plt. figure()
plt. plot (epochs,loss,'r',label='Training Loss',linestyle='-',marker='*')
plt. plot (epochs,val_loss,'b',label='Validation Loss',linestyle='-',marker='*')
plt. title('Training and validation loss')

f = plt.gcf()
f.savefig('./data/result/loss.png')
f.clear()

def predict_image(file_path):
    img = image_utils.load_img(file_path, target_size=(64, 64))
    x = image_utils.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = x / 255
    img = np.vstack([x])
    prediction = model.predict(img)[0]
    if prediction[0] <= 0.5:
        return 'cat'
    else:
        return 'dog'

j=0
for i in range(1,101):
    file_path = os.path.join(validation_cats_dir,f'xiaomao-{i}.jpg')
    if(predict_image(file_path)=='cat'):
        j=j+1
    print(f'xiaomao-{i}.jpg is {predict_image(file_path)}')

for i in range(1,101):
    file_path = os.path.join(validation_dogs_dir,f'xiaogou-{i}.jpg')
    if(predict_image(file_path)=='dog'):
        j=j+1
    print(f'xiaogou-{i}.jpg is {predict_image(file_path)}')

print(f'success rate is {j/2}%')
