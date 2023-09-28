# 自动构建

本网站使用这里的脚本和配置进行自动构建，构建的 worker 采用 kubernetes 进行部署。

## 准备工作

首先准备好 kubernetes 集群，确保 kubeconfig 正确配置，kubectl 命令能够操作集群。

然后 clone 本仓库并 cd 到 ci 目录下:

```bash
git clone --depth=1 https://github.com/imroc/imroc.cc.git
cd imroc.cc/ci
```

最后在 ci 目录下创建好依赖的敏感文件:

* `id_rsa`: ssh 密钥。
* `id_rsa.pub`: ssh 公钥。
* `.gitconfig`: git 配置文件，需将默认的 user 信息配上去 (git commit 时用到的用户名和邮箱)，示例：
    ```gitconfig
    [user]
      email = roc@imroc.cc
      name = roc
    ```

## 部署方法

```bash
make install
```

## 卸载

```bash
make uninstall
```

