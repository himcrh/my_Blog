---
category: 题解
tags:
  - 数论
  - BFS
date: 2021-07-15
title: Emails题解
vssue-title: Emails
---
<!-- more -->
# Emails 题解
## 题目
有$N$个节点，$M$条边。每个结点每次能将其相邻的结点连接。问：是否能将所结点连接起来，需要多少天。

**Input**
The first line of the input contains two integers $N$ and $M$
The $M$ following lines each contain two integers, $i$ and $j$,两点之间存在一条边

**Limits**
$2≤N≤100000$
$1≤M≤100000$

**Output**
The output should contain a single integer equal to either:

* $−1$ if the process does not lead to everyone eventually having everyone else's email address, or
* the estimated necessary number of days, otherwise. Note that this number may be equal to 0.
* 假设需要$k$天连接，可输出$k$或者$k+1$

---
## 题目理解
* 首先建立一个图，可用并查集的方式判断该图是否联通（本题有其他方法）。
* 每次每个点能将其相邻的点连接，假设有两个点的距离为$k$,那么在其连接所需要的天数中$k-1$距离的点必然会自动连接好。所以，求出图的直径（图中最短路的最大距离）就可以得到需要多少天的间接条件。
* 可推出数学规律,$x$天可联通的最远距离为$2^x$
* 注意利用输出$k$,或者$k+1$这个条件

---
## 数学推导
* 对任意一个结点，设其在图中的最远距离为$depth$
* 设图的直径为$dis$
* 假设$k$天使图全联通，有$2^{k-1}<dis\leqslant 2^k$
* ${dis\over2}\leqslant depth \leqslant dis$
* $2^{k-2}<depth \leqslant 2^k$
* 两边取$2$的对数，有 $k-2<log_2(depth) \leqslant k$
* 同时$+1$有 $k-1<log_2(depth)+1 \leqslant k+1$
* 即 $k\leqslant log_2(depth)+1 \leqslant k+1$
* 只需要求出 $log_2(depth)+1$ 就一定在$k$和$k+1$之间，输出即可

---
## 代码实现
* 由分析得，我们求出任意一点的$depth$就可以
* 那么我们建完图之后跑一遍BFS
* 可以标记联通点的个数$connect$
* 如果$connect != n$说明该图不全联通，输出$-1$
* 注意建图时因为要连接双向边，开二倍的数组！！！（wa了无数发）

<details>
<summary>查看代码</summary>

``` cpp
#include<bits/stdc++.h>
using namespace std;
const int N=1e5+10;
int cnt;
int head[N<<1],nxt[N<<1],to[N<<1];
//bfs相关
int dep[N];
bool visited[N];
int connect;
typedef pair<int,int> P;
queue<int> q;

int n,m;

void add(int x,int y){
    nxt[++cnt]=head[x];
    head[x]=cnt;
    to[cnt]=y;
}

P BFS(int x){
    memset(visited,0,sizeof(visited));
    memset(dep,0,sizeof(dep));
    connect = 1;
    q.push(x);
    visited[x]=1;
    while(q.size()){
        int cur=q.front();
        q.pop();
        for(int i=head[cur];i;i=nxt[i]){
            if(!visited[to[i]]){
                visited[to[i]]=1;
                dep[to[i]]=dep[cur]+1;
                connect++;
                q.push(to[i]);
            }
        }
    }
    P maxn = {0,0};
    for(int i=1;i<=n;i++){
        if(dep[i]>maxn.second)
            maxn={i,dep[i]};
    }
    return maxn;
}
int main(){
    scanf("%d %d",&n,&m);
    for(int i=1;i<=m;i++){
        int a,b;
        scanf("%d %d",&a,&b);
        add(a,b);
        add(b,a);
    }
    //先跑两遍bfs试试
    P dis = BFS(1);
    if(connect!=n){
        printf("-1\n");
        return 0;
    }
    int k=0;
    while(pow(2,k)<dis.second)
        k++; 
    
    printf("%d\n",k+1);
    return 0;
}
```

</details>