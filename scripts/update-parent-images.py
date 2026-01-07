#!/usr/bin/env python3
"""
自动更新父目录的 images.json 的 productImages 字段

用法:
    python3 scripts/update-parent-images.py "Poi Products/PROTECTION"

原理:
    1. 查找父目录下所有子目录的 images.json
    2. 按子目录的 sort 值排序
    3. 拼接所有子目录的 productImages 数组
    4. 更新父目录的 images.json
"""

import json
import os
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
PRODUCTS_DIR = PROJECT_ROOT / "src/products"


def get_subdirs_images_json(parent_path: Path) -> list[tuple[float, dict]]:
    """获取所有子目录的 images.json，按 sort 值排序"""
    subdirs = []

    for entry in sorted(parent_path.iterdir()):
        if entry.is_dir():
            images_json_path = entry / "images.json"
            if images_json_path.exists():
                with open(images_json_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    sort = data.get("sort", 0)
                    subdirs.append((sort, data))

    return sorted(subdirs, key=lambda x: x[0])


def merge_product_images(subdirs: list[tuple[float, dict]]) -> list[dict]:
    """合并所有子目录的 productImages"""
    merged = []
    for _, data in subdirs:
        images = data.get("productImages", [])
        merged.extend(images)
    return merged


def update_parent_images_json(parent_path: Path, merged_images: list[dict]) -> None:
    """更新父目录的 images.json"""
    parent_images_path = parent_path / "images.json"

    if parent_images_path.exists():
        with open(parent_images_path, "r", encoding="utf-8") as f:
            parent_data = json.load(f)
    else:
        # 如果父目录没有 images.json，创建新的
        parent_data = {
            "name": parent_path.name,
            "sort": 0,
            "productImages": []
        }

    parent_data["productImages"] = merged_images

    with open(parent_images_path, "w", encoding="utf-8") as f:
        json.dump(parent_data, f, indent=2, ensure_ascii=False)
        f.write("\n")


def main():
    if len(sys.argv) < 2:
        print("用法: python3 scripts/update-parent-images.py <相对路径>")
        print("示例: python3 scripts/update-parent-images.py 'Poi Products/PROTECTION'")
        sys.exit(1)

    relative_path = sys.argv[1]
    parent_path = PRODUCTS_DIR / relative_path

    if not parent_path.exists():
        print(f"错误: 目录不存在: {parent_path}")
        sys.exit(1)

    print(f"更新父目录: {relative_path}")

    # 获取子目录 images.json
    subdirs = get_subdirs_images_json(parent_path)
    print(f"找到 {len(subdirs)} 个子目录")

    # 合并图片
    merged_images = merge_product_images(subdirs)
    print(f"合并 {len(merged_images)} 张图片")

    # 更新父目录
    update_parent_images_json(parent_path, merged_images)
    print(f"已更新: {parent_path / 'images.json'}")


if __name__ == "__main__":
    main()
