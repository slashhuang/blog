### mongodb实现数据表join


### 采用Embedded Documents实现1对多的数据结构关系

在设计collection的时候,采用`One-to-Many`的数据结构，加速数据库query


### linking reference 


**不好的结构**

```bash
    # 信息重复，大一统
   {
    title: "MongoDB: The Definitive Guide",
    author: [ "Kristina Chodorow", "Mike Dirolf" ],
    published_date: ISODate("2010-09-24"),
    pages: 216,
    language: "English",
    publisher: {
                name: "O'Reilly Media",
                founded: 1980,
                location: "CA"
            }
    }

    {
        title: "50 Tips and Tricks for MongoDB Developer",
        author: "Kristina Chodorow",
        published_date: ISODate("2011-05-06"),
        pages: 68,
        language: "English",
        publisher: {
                    name: "O'Reilly Media",
                    founded: 1980,
                    location: "CA"
                }
    }
```

**好的结构**

```bash
    # 书名collection 1
    {
    _id: "oreilly",
    name: "O'Reilly Media",
    founded: 1980,
    location: "CA"
    }
    # 书列表
    {
    _id: 123456789,
    title: "MongoDB: The Definitive Guide",
    author: [ "Kristina Chodorow", "Mike Dirolf" ],
    published_date: ISODate("2010-09-24"),
    pages: 216,
    language: "English",
    publisher_id: "oreilly"
    }

    {
    _id: 234567890,
    title: "50 Tips and Tricks for MongoDB Developer",
    author: "Kristina Chodorow",
    published_date: ISODate("2011-05-06"),
    pages: 68,
    language: "English",
    publisher_id: "oreilly"
    }

```

[参考文档](https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/)