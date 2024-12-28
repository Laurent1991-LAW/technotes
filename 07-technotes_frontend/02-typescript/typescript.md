







```typescript
let str: string
S=10 // 报错
```



- 断言

```typescript
let numArr = [1, 2, 3]
const result = numArr. find(item = item > 2) as number // as number 部分 为 断言
result * 5 // 若无断言部分, 此处不编译不通过, 因为result可能为undefined
```



```typescript
let v1: string = 'abc'
let v2: number = 10
let v3: boolean = true
let nu: null = null
let un: undefined = undefined
// v4可能为str也可能为null
let v4: string | null = null
// v5可能为1、2、3, 若=后面为5则报错
let v5: 1 | 2 | 3 = 2
```

