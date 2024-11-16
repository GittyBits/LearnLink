#include <stdio.h>
#include <string.h>

#define MAX_USERS 100

typedef struct User {
    int id;
    char name[50];
} User;

typedef struct UserTable {
    User users[MAX_USERS];
    int count;
} UserTable;

void initUserTable(UserTable *table) {
    table->count = 0;
}

void addUser(UserTable *table, int id, const char *name) {
    if (table->count >= MAX_USERS) {
        printf("User table is full.\n");
        return;
    }
    table->users[table->count].id = id;
    strcpy(table->users[table->count].name, name);
    table->count++;
}

User *getUser(UserTable *table, int id) {
    for (int i = 0; i < table->count; i++) {
        if (table->users[i].id == id) {
            return &table->users[i];
        }
    }
    return NULL;
}


