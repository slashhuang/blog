## 比对mongodb和mysql

## 数据库主流分类

- Nosql database 非关系型数据库

- RDBMS (Relational Database Management System)关系型数据库

### mysql概述

mysql采用table和结构化的sql语句来处理数据，
在mysql中，需要预先定义数据结构schema，并定义table中数据字段的关系。
在mysql中，相关信息可以保存在不同的表中，通过join的形式来保持彼此关联。
因此对应的数据信息重复读比较小。

### mongodb概述

mongoDB采用类JSON的documents来存储数据。
在mongoDB的查询语句中，相关信息由于存储在一块，所以查询速率非常快。

> Collections do not enforce document structure.

mongoDB采用动态数据模型schema，这意味着不需要预先定义表的数据类型和字段名。
当mongoDB需要更新文档documents的时候，可以轻松增加新的字段名或者删除旧有的字段名。

这种数据结构能够让开发者让数据结构更加层级化，存储数组或其他复杂数据结构。
在同一个集合collection中，文档document不一定要有同样的数据字段set。
差异化的数据结构也比较常见。

mongoDB具备高扩展性和延展性和自动分片机制(auto-sharding)。

### mongodb和mysql术语和概念比对

| MySQL | MongoDB |
| ------| ------ |
| Table | Collection |
| Row | Document |
| Column | Field |
| Joins | Embedded documents, linking |

### mongodb和mysql特性对比

|    | MySQL | MongoDB |
| ------| ------ | ------ |
| Rich Data Model | No | Yes |
| Dynamic Schema | No | Yes |
| Typed Data | Yes | Yes |
| Data Locality | No | Yes |
| Field Updates | Yes | Yes |
| Easy for Programmers | No | Yes |
| Complex Transactions | Yes | No |
| Auditing | Yes | Yes |
| Auto-Sharding | No | Yes |

### mongodb和mysql查询语句对比

```bash
    # MySQL
    INSERT INTO users (user_id, age, status)
    VALUES ('bcd001', 45, 'A')

    # MongoDB
    db.users.insert({
        user_id: 'bcd001',
        age: 45,
        status: 'A'
    })
```   
```bash
    # MySQL
    SELECT * FROM users

    # MongoDB
    db.users.find()

``` 
```bash
    # MySQL
    UPDATE users SET status = 'C'
    WHERE age > 25

    # MongoDB
    db.users.update(
        { age: { $gt: 25 } },
        { $set: { status: 'C' } },
        { multi: true }
    )

```   

### 为什么选择MongoDB而不是MySQL

大部分具备一定体量的公司都逐渐选择了mongodb，
因为mongo让应用的编写更加的快速，
处理更多的数据类型和扩展数据库。

在MongoDB的开发下，documents的映射关系更加贴合了
OOP的编程语言，这样就减少了orm给应用带来的复杂性。

同时，MongoDB的数据类型灵活性让schema的扩展可以轻松的适应业务逻辑。

MongoDB可以轻松实现分布式数据中心和高延展性。
这在mysql时代是一件巨大的工程问题。
当你的数据体量达到海量级别的时候，Mysql需要严谨和个性化的工程工作
才能完成较好的数据扩展和迁移工作。
