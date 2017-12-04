# zanryu
[![Travis](https://img.shields.io/travis/sunya9/zanryu.svg?style=flat-square)](https://travis-ci.org/sunya9/zanryu)

`/zanryu` は 特定の状況下において利用できる `/remind` コマンドの糖衣構文です。

## セットアップ
[now](https://zeit.co/now)での利用を想定。


1. [Slackでアプリを作成しておく](https://api.slack.com/apps?new_app=1)。
2. OAuth & Permissionsで`reminders:write`権限を追加しておく。
3. Slash Commandsで適当にコマンドを作成しておく。`/zanryu`推奨。リクエストURLは一旦無視。
4. サーバー側作業。リポジトリをclone。
5. `yarn`(or `npm install`)。
6. `now.exmaple.json` を `now.json`にリネーム。下記の環境変数で適宜設定。
7. `now` コマンドでデプロイ(`now`は事前にインストールが必要、`npm install -g now-cli`)。デプロイ時にURLを保持しておく。
8. Slack側。リクエストURL項目に保持したURLを貼り付ける。
9. Basic Informationの項目でInstall your apps to your workspaceでインストールしたいチームにアプリをインストール。

## 設定(環境変数)

|キー|デフォルト値|説明|
|---|---|---|
|`DATE`|2weeks|`/zanryu`コマンドを受け取ってから次に設定するまでの相対日付（時間は考慮しない）。[moment.js](https://momentjs.com/)の処理に依存。数値+単位でなんとかなる。|
|`MESSAGE`|残留届けが切れました。更新してください。|remindが満期になったときに発行されるメッセージ。|
|`TIME`|09:00|remindを発行する時間。コロンはなくても良いが、常に2桁であるべき。
|`TOKEN`||SlackのAPIトークン。アプリページのOAuth & Permissionsから確認可能。
|`VERIFICATION_TOKEN`||リクエストが正当性を確認するトークン。Basic Informationから取得可能。

`now.json`に記述する場合は[`now secrets add`](https://zeit.co/docs/features/env-and-secrets#securing-env-variables-using-secrets)でトークン類の環境変数は暗号化するべき。