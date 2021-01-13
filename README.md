# TypeFP
类型体操实践，将typescript的type部分拿来当函数式语言使用。欢迎pr补充
## 基本数字操作
## 定义，拆包
```ts
type int = Int<20> // 定义一个不可变的int
type num = Unpack<int> // expect 20 拆包，返回一个数字字面量20

type int2 = Int<-1> // 定义一个负数
type num2 = Unpack<int2> // expect -1 拆包，返回一个字面量-1
```
## 比较
```ts
type comp = Compare<Int<0>, Int<0>> // expect true
type comp1 = Compare<Int<0>, Int<-1>> // expect false

type comp2 = LessThan<Int<0>, Int<0>> // expect false
type comp3 = LessThan<Int<0>, Int<-1>> // expect false
type comp4 = LessThan<Int<-1>, Int<-3>> // expect false
type comp5 = LessThan<Int<-2>, Int<20>> // expect true
type comp6 = LessThan<Int<-2>, Int<-1>> // expect true
```
## 四则运算
```ts
type int = Int<1>
// 加
type plus1 = Plus<int> // +1
type res1 = Unpack<plus1> // 2
type plus2 = Plus<int,Int<10>>
type res2 = Unpack<plus2> // 11
type plus3 = Plus<int,Int<-10>>
type res3 = Unpack<plus3> // -9

// 减
type subtract1 = Subtract<int> // -1
type res4 = Unpack<subtract1> // 0
type subtract2 = Subtract<int,Int<10>>
type res5 = Unpacksubtract2> // -9
type subtract3 =Subtract<int,Int<-10>>
type res6 = Unpack<subtract3> // 11

// 乘
type res7 = Unpack<Multiply<int, Int<10>>> // expect 10
type res8 = Unpack<Multiply<int, Int<-5>>> // expect -5

// 除
type res9 = Unpack<Divide<int, Int<10>>> // expect 0
type res10 = Unpack<Divide<int, Int<0>>> // expect never
type res11 = Unpack<Divide<Int<5>, int>> // expect 5
type res12 = Unpack<Divide<Int<5>, Int<2>>> // expect 2
type res13 = Unpack<Divide<Int<5>, Int<-2>>> // expect -2

// 混合
type mix = Multiply<Int<2>, Plus<Divide<Int<5>, Int<2>>>>
type res14 = Unpack<mix> // expect 6
```
## 数组操作
```ts
type arr = [1, 2, 3, 'hello', 'world'] // 定义一个不可变数组
type arr1 = Shift<arr> // expect [2,3,'hello','world'] 去掉数组最前面的元素，并返回一个新数组
type lastItem = Last<arr> // 返回数组最后一个元素，expect 'world'
type len = Len<arr1> // expect 4
type item0 = Index<arr1, 0> //  2
type limitArr = MaxLen<arr, Int<2>> // 去掉期望长度外的其他部分 expect [1,2]
type slice1 = Slice<arr, Int<2>> // 和js的slice一样, expect [3,'hello','world']
type slice2 = Slice<arr, Int<2>, Int<2>> // 和js的slice一样, expect [3,'hello']
```