---
title: "VSeeFace をLinux で使用する"
date: 2023-09-18
tags: [tech, mocap]
---

## 目的

- Windows 向けに開発されているWebカメラを用いたモーションキャプチャーツールのVSeeFace をLinux で利用してOBS で使う方法

## やり方

1. VSeeFace を普通にDL してくる. [vseeface DL site](https://www.vseeface.icu/)
2. Steam for linux をDL してくる. [steam for linux](https://store.steampowered.com/)
3. Steam をInstall
4. Steam を開いてMenu のGames→Add a Non-Steam Game to My Library... を選択
   - ![](https://imagedelivery.net/TzzMDnIynS-86GWMogqUcw/bf587040-055c-4cd0-5c0e-3f0e33c87600/public)
5. Browse から VSeeFace のExe ファイルを選択
6. 追加されたVSeeFace の詳細画面に行き歯車からProperties... を選択

- ![](https://imagedelivery.net/TzzMDnIynS-86GWMogqUcw/5eb2bf7e-bbfc-48cd-ec9f-1d3821110d00/public)

7.  Compatibility に行ってForce the use of specific Steam Play Compatibility tool にチェックをつける
8.  選択肢から Proton 6.3-8 を選択

- ![](https://imagedelivery.net/TzzMDnIynS-86GWMogqUcw/eb7e29fa-f429-4bc4-1cd2-7238a36c8100/public)

9.  戻ってPlay をクリックするとVSeeFace が起動する

## OBS でのひと工夫

- VSeeFace は残念ながら背景色を変えられません.
- OBS のGame 画面キャプチャの方法を取ると自動的に背景色を透過してくれるようでうまく行くそうですが,残念がらLinux 版OBS にはそのような機能がなくWindow Capture しか存在しません
- Window Capture でFilter>クロマキーを選ぶと一応背景色をPick して透過できますが,アバターによっては背景色と似ててうまく透過できないかもしれません.
- 自分のアバターはなんとかくりあできたのですが,ひと工夫として下記画像のようなパラメタ設定にしたら抜けました.
  ![](https://imagedelivery.net/TzzMDnIynS-86GWMogqUcw/bdf5b6f2-c9a0-4ee0-fdc5-3193f3188800/public)
