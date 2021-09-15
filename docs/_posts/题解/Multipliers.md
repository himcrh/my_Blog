---
category: 题解
tags:
  - 快速幂
  - 费马小定理
  - 数论
date: 2021-07-13
title: Multipliers题解
vssue-title: Multipliers
---
<!-- more -->
# Multipliers
## 题目
Ayrat has number *n*, represented as it's prime factorization pi of size *m*, i.e. *n = p1·p2·...·pm*. Ayrat got secret information that that the product of all divisors of *n* taken modulo **$10^9 + 7$** is the password to the secret data base. Now he wants to calculate this value.

**Input**
The first line of the input contains a single integer *m* (1 ≤ m ≤ 200 000) — the number of primes in factorization of *n*.

The second line contains m primes numbers pi (2 ≤ pi ≤ 200 000).

**Output**
Print one integer — the product of all divisors of n modulo $10^9 + 7$.

## 题目理解
输入条件给出了*m*的所有质因子（乘积取模为*n*），可以对每个质因子求其贡献（其在*n*所有因子中出现的次数 $p_i^k$），最后相乘得到*ans*

## 知识点
### 费马小定理
**$a^{p-1} \equiv 1\ (mod\ p)$**

成立条件：如果p是一个质数，而整数a不是p的倍数

结合题目：

**$p_i^k$** $—k$ 值很大，需要取模运算

**$p_i^k\%\ Mod = p_i^{n*(Mod-1)+last}\ \%\ Mod$**

**$p_i^{n*(Mod-1)}=1^n = 1$   (应用费马小定理)**

**$p_i^k\ \%\ Mod = p_i^{last}\ \%\ Mod$**

需要对分子取 **$\%(Mod-1)$** 才能得到余项值

### 快速幂
用于求 **$p_i^k$** 
当$k$很大时运算效率高
将$k$展开为二进制形式
**$k\&1 == 1$** 时 结果乘上此时的 $base$ 值
对于取模问题：只需对每次运算时取模即可

例：$2^{13}$
$13=(1101)_2 = 2^1*2^4*2^8$
<details>

<summary>查看代码</summary>

``` cpp
LL quick_sort(LL x,LL k){
    LL ans = 1;
    LL base = x;
    while(k){
        if(k&1)
            ans = (ans*base)%Mod;
        base = (base*base)%Mod;
        k>>=1;
    }
    return ans%Mod;
}
```
</details>

### 数学难点

对于每一个$p_i$,存在$k_{p_i}$个相同的质因数。这些数能提供$k_{p_i}+1$个选择(即取$0,1,...,k_{p_i}$个)。所以总共有$(k_{p_1}+1)*(k_{p_2}+1)*...*(k_{p_m}+1)$个选择，记为$mult$。

再枚举每一种情况
当枚举到$i$时，除$i$之外有$mult/(k_{p_i}+1)$种选择

对于第$i$项，其可以取$1,2,...,k_{p_i}$种选择

每取一种，总体就会上升$p_i^{(1,2,...,k_{p_i})*mult/(k_{p_i})}$幂次。

$p_i$的贡献值为$p_i^{(1+k_{p_i})*k_{p_i}*mult/(k_{p_i}*2)}=p_i^{k_{p_i}*mult/2}$

注意，我们之前所求的$mult$等，都是$p_i$的幂次，所以在取模时要$\%(Mod-1)$

## 代码实现
<details>
<summary>查看代码</summary>

``` cpp
#include<bits/stdc++.h>
using namespace std;
#define LL long long
const int Mod=1e9+7;
const int N=2e5+10;
int a[N];
pair<int,int>P[N];
int cnt;
LL quick_sort(LL x,LL k){
    LL ans = 1;
    LL base = x;
    while(k){
        if(k&1)
            ans = (ans*base)%Mod;
        base = (base*base)%Mod;
        k>>=1;
    }
    return ans%Mod;
}
int main(){
    int m;
    //cout<<quick_sort(2,5);
    scanf("%d",&m);
    for(int i=1;i<=m;i++)
        scanf("%d",&a[i]);
    sort(a+1,a+m+1);
    for(int i=1;i<=m;i++){
        if(a[i]==a[i-1])
            P[cnt].second++;
        else
            P[++cnt]={a[i],1};
    }
    bool flag = 1;
    LL mult = 1;
    for(int i=1;i<=cnt;i++){
        LL cur = P[i].second+1;
        if(flag && !(cur&1)){
            cur/=2;
            flag = 0;
        }
        mult = (mult*cur)%(Mod-1);
    }
    //cout<<mult<<endl;
    LL ans=1;
    for(int i=1;i<=cnt;i++){
        LL cur=P[i].second;
        if(flag)
            cur/=2;
        cur=(cur*mult)%(Mod-1);
        ans = (ans*quick_sort(P[i].first,cur))%Mod;
    }
    printf("%lld\n",ans);
    return 0;
}
```

</details>

对于代码中$flag$的解释：$p_i^{k_{p_i}*mult/2}$ 若前置$P[i].second$为奇数，则提前在$mult$计算环节$/2$。反之，$P[i].second$都为偶数，在$ans$计算环节$/2$。