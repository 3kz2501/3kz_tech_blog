---
title: "Cloudflare Workers とGPT を使ってBitcoin メーリスを翻訳して閲覧できるサイトを作る(前編)"
date: 2023-10-03
tags: [gpt, cloudflare, workers]
---

## 目的

- Bitcoin やLightning Network のメーリスはそれぞれの開発者にとっては一次情報として重要だが, 英語でかつ文章整形などもなく読みづらい
- せめて日本語にしたいのでCloudflare Email workers を利用して指定したアドレスにメールが来たらWorkers を起動させてメール内容をパース
- その後OpenAI のGPT のAPI に翻訳を依頼してその結果をDB に保管する(Cloudflare KV もしくはD1 を想定)
- DB が更新されたタイミングでNostr などにBot 経由で投稿する
- 全文載らない場合もあるので保管した情報を一覧で見れるサイトをRemix でPages に公開する

## 今回やったこと

- 一旦前編としてGPT 翻訳したものをKV ストアに保管する
- [全体のコードはこちら](https://github.com/nilnu1l/btc-ln-dev-mailing_list-gpt)

- wrangler.toml はシークレットも環境変数として載っけてしまうので一旦本物は除外していますがTemplate としてwrangler.default.toml を載せました.
- こちらは命名変更して使用できるようにしています.
- 引っかかった点としてはKV をあとから追加して末尾に記載したのですがAI の項目に巻き込まれたのかうまいことRemote 側で判定されずにバインドされないことがありましたので上段に記載することで回避できました.
- やってることは単純でEmail Workers で受け取るエンドポイント `email` でメッセージとEnv などを受取それをパースしてOpenAI のAPI に渡してるだけです.
- KV には一旦その場で作ったUUIDをKey として保管しています.

## 今後の対策

- KV だと本文とUUID しか保管できないので受信した時間やメーリスのタイトルなどで絞るのがだるいので多分D1 に移行します.
- 次は保管された情報をもとにNostr への投稿Bot を作ったり, 一覧を閲覧できるサイトを作ろうかと思っています.
