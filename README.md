# 洗濯日和 /laundry-weather 🧺

今日の天気をもとに、洗濯物を外干しできるか判定するWebアプリです。

A web app that tells you whether it's a good day to hang your laundry outside, based on real-time weather data.

## デモ / Demo

https://laundry-weather.vercel.app/

## 機能 / Features

- 主要都市の洗濯指数を表示 / Laundry score for major Japanese cities
- 現在地の天気を自動取得 / Auto-detect current location
- 気温・湿度・風速・降水確率・花粉・PM2.5を表示 / Displays temperature, humidity, wind speed, precipitation, pollen, and PM2.5
- 湿度と風速を組み合わせた独自の洗濯スコア算出 / Original laundry score combining humidity and wind speed
- スコアに連動したアドバイス表示 / Context-aware advice based on score
- ダークモード対応 / Dark mode support

## 技術スタック / Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Font Awesome
- Open-Meteo API（天気・花粉・PM2.5 / Weather, pollen, PM2.5）
- Nominatim API（逆ジオコーディング / Reverse geocoding）

## 工夫した点 / Technical Highlights

湿度が高くても風が強ければ洗濯物は乾きやすいという実際の気象特性を反映し、湿度と風速を組み合わせてスコアを算出しています。またスコアに応じてアドバイスの内容を切り替えることで、室内干し推奨時に外干し前提のアドバイスが出ないよう設計しています。

The laundry score reflects real meteorological logic — high humidity is less of a problem when wind speed is high. Advice is also context-aware: outdoor drying tips only appear when the score is high enough to recommend outdoor drying.

## ローカル起動 / Getting Started

```bash
git clone https://github.com/ruik0321/laundry-weather.git
cd laundry-weather
npm install
npm run dev
```