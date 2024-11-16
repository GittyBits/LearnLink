#include <stdio.h>
#include <string.h>

#define MAX_PRODUCTS 100

typedef struct Product {
    int id;
    char name[50];
    char category[30];
} Product;

typedef struct ProductTable {
    Product products[MAX_PRODUCTS];
    int count;
} ProductTable;

void initProductTable(ProductTable *table) {
    table->count = 0;
}

void addProduct(ProductTable *table, int id, const char *name, const char *category) {
    if (table->count >= MAX_PRODUCTS) {
        printf("Product table is full.\n");
        return;
    }
    table->products[table->count].id = id;
    strcpy(table->products[table->count].name, name);
    strcpy(table->products[table->count].category, category);
    table->count++;
}

Product *getProduct(ProductTable *table, int id) {
    for (int i = 0; i < table->count; i++) {
        if (table->products[i].id == id) {
            return &table->products[i];
        }
    }
    return NULL;
}
