# 說明文件

### 安裝專案

```bash
git clone https://github.com/DandinPower/petgame-backend.git
cd petgame-backend/
//m1 mac
brew install pkg-config cairo pango libpng jpeg giflib librsvg
npm install
```

### 運行Server

```bash
npm run server
```

### 使用功能

- Post
- URL : https://localhost/8001/combine/

```json
{
    "hand": "hand_0",
    "hat" : "hat_1",
    "glasses" : "none",
    "cloth" : "cloth_0",
    "pant" : "none",
    "pet" : "pet_1"
}

```

### 回傳

```json
{
    "name": "nft_pet",
    "description": "this is cool",
    "image": "https://ipfs.io/ipfs/QmTy4MZftZcDq1ZVMoS6iJF7Q7pp39nVCPKeLQ9WbY8bYB",
    "local_image": "http://localhost:8001/build/e068cc57.png",
    "attributes": [
        {
            "trait_type": "hand",
            "value": "hand_0"
        },
        {
            "trait_type": "hat",
            "value": "hat_1"
        },
        {
            "trait_type": "glasses",
            "value": "none"
        },
        {
            "trait_type": "cloth",
            "value": "cloth_0"
        },
        {
            "trait_type": "pant",
            "value": "none"
        },
        {
            "trait_type": "pet",
            "value": "pet_1"
        }
    ]
}
```