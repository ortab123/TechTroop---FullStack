USE sql_testing;

CREATE TABLE test_table(
    test_id INT NOT NULL AUTO_INCREMENT,
    test_field VARCHAR(20),
    test_field_2 INT,
    PRIMARY KEY (test_id)
);

INSERT INTO test_table VALUES(null, "Bowling", 12);
SELECT * FROM test_table;