---
title: "Open Interpreter をDocker 上で使用する"
date: 2023-09-18
tags: [tech, docker]
---

## 目的

- Open-interpreter を使って色々試したい.
- ただLocal 環境だといろいろいじられるのは気持ち悪いのでDocker 環境を用意する
- 一旦Dockerfile を作ってDocker run できる環境を用意する

## やったこと

- Python:3.11 環境のImage を利用してOpen-interpreter をInstall するだけ
- [Github repository](https://github.com/nilnu1l/docker-open-interpreter)
- 環境変数として `.env` ファイルにOPENAI_API_KEY を設定すればREADME の `docker run` コマンドで指定されるので自動的にOPENAI の方を使ってくれるようになる
- `docker run` するとEntryPoint として `interpreter -y` を指定しているためプロンプト入力から始めることができる
- 使い方としては最終的な提出物(画像やコードなど) を`/output-data` ディレクトリに吐き出すようにプロンプトに含めると最終結果がLocal のディレクトリ内のdata ディレクトリに出力されるようになる

## 欠点

- 以前のプロンプトなどは覚えてられないので履歴的なことができてない.
- 一旦対話した内容をtxtとして出力させて次回そのtxt を読ませるなどするとちょっと引き継げたけど精度は不明..
