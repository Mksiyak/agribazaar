# Schema
Tables
- Users
- Items
- ItemSeller
- Cart

## Users
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| username | varchar(10)  | NO   | MUL | NULL    |                |
| password | varchar(25)  | NO   |     | NULL    |                |
| fullname | varchar(20)  | NO   |     | NULL    |                |
| email    | varchar(50)  | NO   |     | NULL    |                |
| role     | varchar(20)  | YES  |     | NULL    |                |
| address  | varchar(100) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+

## Items
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| name        | varchar(20)  | NO   |     | NULL    |                |
| description | varchar(100) | YES  |     | NULL    |                |
| id          | int          | NO   | PRI | NULL    | auto_increment |
| category    | varchar(20)  | YES  |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+

## ItemSeller
+--------------+-------------+------+-----+---------+----------------+
| Field        | Type        | Null | Key | Default | Extra          |
+--------------+-------------+------+-----+---------+----------------+
| sellerId     | int         | YES  | MUL | NULL    |                |
| itemId       | int         | YES  | MUL | NULL    |                |
| pricePerItem | float(10,2) | YES  |     | NULL    |                |
| unit         | varchar(10) | YES  |     | NULL    |                |
| quantity     | int         | YES  |     | NULL    |                |
| id           | int         | NO   | PRI | NULL    | auto_increment |
+--------------+-------------+------+-----+---------+----------------+

## Cart
+--------------+-------------+------+-----+---------+----------------+
| Field        | Type        | Null | Key | Default | Extra          |
+--------------+-------------+------+-----+---------+----------------+
| userid       | int         | YES  | MUL | NULL    |                |
| itemno       | int         | YES  |     | NULL    |                |
| quantity     | int         | YES  |     | NULL    |                |
| itemStatus   | varchar(20) | YES  |     | NULL    |                |
| price        | varchar(10) | YES  |     | NULL    |                |
| id           | int         | NO   | PRI | NULL    | auto_increment |
| itemSellerId | int         | YES  | MUL | NULL    |                |
+--------------+-------------+------+-----+---------+----------------+

### SellerItemList (View)
+-------------+------+------+-----+---------+-------+
| Field       | Type | Null | Key | Default | Extra |
+-------------+------+------+-----+---------+-------+
| itemId      | int  | YES  |     | NULL    |       |
| SellerNames | text | YES  |     | NULL    |       |
+-------------+------+------+-----+---------+-------+

### SearchView (View)
+-------------+--------------+------+-----+---------+-------+
| Field       | Type         | Null | Key | Default | Extra |
+-------------+--------------+------+-----+---------+-------+
| id          | int          | YES  |     | 0       |       |
| name        | varchar(20)  | YES  |     | NULL    |       |
| description | varchar(100) | YES  |     | NULL    |       |
| category    | varchar(20)  | YES  |     | NULL    |       |
| SellerCount | bigint       | YES  |     | NULL    |       |
| SellerNames | text         | YES  |     | NULL    |       |
+-------------+--------------+------+-----+---------+-------+


### CartView (View)
+----+----------+----------+---------------------+----------+----------+------------+--------------+-----------+----------------+
| id | username | name     | description         | category | quantity | itemStatus | pricePerItem | unit      | fullname       |
+----+----------+----------+---------------------+----------+----------+------------+--------------+-----------+----------------+
|  1 | mukesh   | Rice     | Basmati Indian Rice | Cereals  |       10 | buying     |         5.00 | Rupees/Kg | Nirmal Khedkar |
|  2 | mukesh   | Urad Dal | Skinned Urad Dal    | Lentils  |        5 | buying     |        10.00 | Rupees/Kg | Nirmal Khedkar |
|  4 | yash     | Rice     | Basmati Indian Rice | Cereals  |       20 | bought     |         5.00 | Rupees/Kg | Nirmal Khedkar |
|  5 | mukesh   | Rice     | Basmati Indian Rice | Cereals  |        1 | buying     |         5.00 | Rupees/Kg | Nirmal Khedkar |
|  6 | mukesh   | Rice     | Basmati Indian Rice | Cereals  |       20 | bought     |         5.00 | Rupees/Kg | Nirmal Khedkar |
|  7 | mukesh   | Urad Dal | Skinned Urad Dal    | Lentils  |       20 | bought     |        10.00 | Rupees/Kg | Nirmal Khedkar |
|  8 | yash     | Urad Dal | Skinned Urad Dal    | Lentils  |       20 | buying     |        10.00 | Rupees/Kg | Nirmal Khedkar |
|  9 | dummy    | Urad Dal | Skinned Urad Dal    | Lentils  |       20 | buying     |        10.00 | Rupees/Kg | Nirmal Khedkar |
| 10 | dummy    | Rice     | Basmati Indian Rice | Cereals  |       20 | buying     |         5.00 | Rupees/Kg | Nirmal Khedkar |
+----+----------+----------+---------------------+----------+----------+------------+--------------+-----------+----------------+