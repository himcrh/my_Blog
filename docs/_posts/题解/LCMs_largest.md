---
category: 题解
tags:
  - 数论
date: 2021-07-14
title: The LCMs Must be Large题解
vssue-title: LCMs_largest
---
<!-- more -->
# The LCMs Must be Large


## 题目

Dora the explorer has decided to use her money after several years of juicy royalties to go shopping. What better place to shop than Nlogonia?

There are $n$ stores numbered from $1$ to $n$ in Nlogonia. The $i$-th of these stores offers a positive integer $a_i$.

Each day among the last $m$ days Dora bought a single integer from some of the stores. The same day, Swiper the fox bought a single integer from all the stores that Dora did not buy an integer from on that day.

Dora considers Swiper to be her rival, and she considers that she beat Swiper on day $i$ if and only if the least common multiple of the numbers she bought on day $i$ is strictly greater than the least common multiple of the numbers that Swiper bought on day $i$.

The least common multiple (LCM) of a collection of integers is the smallest positive integer that is divisible by all the integers in the collection.

However, Dora forgot the values of $a_i$. Help Dora find out if there are positive integer values of $a_i$ such that she beat Swiper on every day. You don't need to find what are the possible values of $a_i$ though.

Note that it is possible for some values of $a_i$ to coincide in a solution.

**Input**
The first line contains integers $m$ and $n$ (1≤$m$≤50, 1≤$n$≤104) — the number of days and the number of stores.

After this $m$ lines follow, the $i$-th line starts with an integer $s_i$ (1≤$s_i$≤$n−1$), the number of integers Dora bought on day $i$, followed by $s_i$ distinct integers, the indices of the stores where Dora bought an integer on the $i$-th day. The indices are between 1 and $n$.

**Output**
Output must consist of a single line containing "$possible$" if there exist positive integers $a_i$ such that for each day the least common multiple of the integers bought by Dora is strictly greater than the least common multiple of the integers bought by Swiper on that day. Otherwise, print "$impossible$".

Note that you don't have to restore the integers themselves.

---

## 题目理解
给定一个$n$个元素的正整数集，$m$次选取都满足$lcm(choose)>lcm(unchoose)$。

直觉：如果$possible$，则任意一次选取与其他次都有交集。

---

## 数学推导
假设直觉成立。
集合有$n$个元素，预设每个元素为$1$
每次选取后，给选取的元素乘质数$p_i$
经过m次选取，每次选取的$lcm(choose)=p_1*p_2*...*p_m$
第$i$次选取的余项，其$lcm(unchoose)$至少比$lcm(choose)$少一个$p_i$的因子，所以假设成立。

---

## 代码实现

<details>

<summary>数组模拟代码</summary>

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int N=1e4+10;
int a[55][N];
int main(){
    int m,n;
    scanf("%d %d",&m,&n);
    bool flag=1;
    for(int j=1;j<=m;j++){
        int len;
        scanf("%d",&len);
        for(int i=1;i<=len;i++){
            int x;
            scanf("%d",&x);
            a[j][x]=1;
        }
        for(int i=1;i<j;i++){
            bool flag1=1;
            for(int k=1;k<=n;k++){
                if(a[i][k]&a[j][k]){
                    flag1=0;
                    break;
                }
            }
            if(flag1){
                flag=0;
                break;
            }
        }
    }
    if(flag){
        printf("possible\n");
    }
    else{
        printf("impossible\n");
    }
    return 0;
}
```
</details>

*开数组有点浪费内存，应该用bitset模拟集合每个元素的取舍，有时间补个代码~*

<details>
<summary>bitset代码</summary>

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int N=1e4+10;
bitset<N>a[55];
int main(){
    int m,n;
    scanf("%d %d",&m,&n);
    bool flag = 1;
    for(int i=1;i<=m;i++){
        int s;
        scanf("%d",&s);
        for(int j=1;j<=s;j++){
            int x;
            scanf("%d",&x);
            a[i][x]=1;
        }
        if(flag){
            for(int j=1;j<i;j++){
                if((a[j]&a[i]).none()){
                    flag = 0;
                    break;
                }
            }    
        }
    }
    if(flag)
        printf("possible\n");
    else
        printf("impossible\n");
    return 0;
}
```

</details>

