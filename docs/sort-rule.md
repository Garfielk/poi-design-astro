# 产品目录排序规则 (Sort Rule)

## 基础规则

目录排序使用 `sort` 字段控制，遵循以下规则：

### 1. 整数层级 (一级目录)
一级目录使用整数作为 sort 值，间隔至少 1：
```
0, 1, 2, 3, 4, 5, 6, ...
```

### 2. 小数层级 (子目录)
子目录使用 `父目录sort + 0.1 * n` 格式，其中 n 为子目录序号：
```
父目录 sort = 3
├── 子目录1 = 3 + 0.1*1 = 3.1
├── 子目录2 = 3 + 0.1*2 = 3.2
├── 子目录3 = 3 + 0.1*3 = 3.3
...
└── 子目录10 = 3 + 0.1*10 = 4.0
```

### 3. 多级嵌套
每深入一级，累加 0.1：
```
一级目录 = 0
└── 二级目录 = 0.1
    └── 三级目录 = 0.11 (0.1 + 0.01)
        └── 四级目录 = 0.111 (0.11 + 0.001)
```

## 示例

### Poi Products
```
0          APPAREL
├─ 0.1     JACKET
└─ 0.2     PANTS
3          Body Armor
4          Knee&Elbow guard
5          PU Protectors
3.5        PROTECTION
├─ 3.6     Chest Protection
├─ 3.7     Knee Protection
├─ 3.8     Elbow Protection
├─ 3.9     Back Protection
└─ 4.0     Body Protection
6          PU&TPE PROTECTION
```

### Partner Brands
```
0          Chest&Back
1          Knee&Elbow
2          Jacket
3          Pants&Short
4          Other
```

## 特殊说明

### 父目录汇总图片

父目录的 `productImages` 需要手动汇总所有子目录的图片，格式如下：

```json
{
  "name": "PROTECTION",
  "sort": 3.5,
  "productImages": [
    {
      "name": "PJ-101",
      "src": "Poi Products/PROTECTION/Chest Protection/PJ-101.png"
    },
    {
      "name": "PJ-102",
      "src": "Poi Products/PROTECTION/Chest Protection/PJ-102.jpg"
    },
    ...
  ]
}
```

**注意**：父目录 `productImages` 是所有子目录 `productImages` 的**直接拼接**，按子目录 `sort` 值从小到大排序。

### 无图片目录
无图片的目录应创建空的 `images.json`：
```json
{
  "name": "目录名",
  "sort": 排序值,
  "productImages": []
}
```

## 文件命名规则

- 文件位置：`src/products/{一级分类}/{二级分类}/{三级分类}/images.json`
- 文件名固定为：`images.json`
- 图片路径：`src` 字段使用相对路径，格式为 `一级分类/二级分类/图片文件名`

## 验证

运行项目后访问产品页面，检查侧边栏排序是否正确。

## 图片更新流程

### 1. 添加新图片到子目录

在子目录中添加图片文件后，更新该子目录的 `images.json`：

```json
{
  "name": "子目录名",
  "sort": 排序值,
  "productImages": [
    {
      "name": "图片名称（不含扩展名）",
      "src": "一级分类/二级分类/图片文件名"
    }
  ]
}
```

### 2. 更新父目录 images.json

父目录的 `productImages` 需要**手动汇总**所有子目录的图片：

**步骤**：
1. 读取所有子目录的 `images.json`
2. 按子目录 `sort` 值从小到大排序
3. 拼接所有子目录的 `productImages` 数组
4. 更新父目录的 `images.json`

**示例**：更新 `PROTECTION/images.json`
- 读取 Chest Protection (sort: 3.6) → Knee Protection (sort: 3.7) → Elbow Protection (sort: 3.8) → Back Protection (sort: 3.9) → Body Protection (sort: 4.0)
- 按顺序拼接所有图片
- 更新 `PROTECTION/images.json` 的 `productImages` 数组

### 3. 快速脚本

在项目根目录执行以下命令可自动更新父目录的 `productImages`：

```bash
# 更新 PROTECTION 父目录
python3 scripts/update-parent-images.py "Poi Products/PROTECTION"
```

脚本 `scripts/update-parent-images.py` 会自动：
1. 查找所有子目录的 `images.json`
2. 按 `sort` 值排序
3. 拼接 `productImages`
4. 更新父目录文件
