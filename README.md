# TypeFP
类型体操实践，将typescript的type部分拿来当函数式语言使用。欢迎pr补充
## 基本数字操作
```ts
type int = Int<20> // 声明一个不可变的int
type int2 = Plus<int,Int<22>> // 等同于 Int<42>
type num = Unpack<int2> // expect 42 拆包，返回一个字面量42
type int3 =  Subtract<int2,Int<2>> // expect Int<40>
```
## 数组操作
```ts
type arr = [1, 2, 3, 'hello', 'world'] // 声明一个不可变数组
type arr1 = Shift<arr> // expect [2,3,'hello','world'] 去掉数组最前面的元素，并返回一个新数组
type lastItem = Last<arr> // 返回数组最后一个元素，expect 'world'
type len = Len<arr1> // expect 4
type item0 = Index<arr1, 0> //  2
type limitArr = MaxLen<arr, Int<2>> // 去掉期望长度外的其他部分 expect [1,2]
type slice1 = Slice<arr, Int<2>> // 和js的slice一样, expect [3,'hello','world']
type slice2 = Slice<arr, Int<2>, Int<2>> // 和js的slice一样, expect [3,'hello']
```