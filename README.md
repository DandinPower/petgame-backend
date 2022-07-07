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
    "hatName":"hat_1",
    "petName":"pet_2"
}
```

### 回傳

```json
{
    "name": "test_name",
    "description": "test_description",
    "image": "https://ipfs.io/ipfs/QmXnXu4Qp7MzNx9oJkfgbpRnKUpTe1CKeVme8yZmAo2jyj",
    "attributes": [
        {
            "trait_type": "Hat",
            "value": "hat_1"
        },
        {
            "trait_type": "Pet",
            "value": "pet_2"
        }
    ]
}
```