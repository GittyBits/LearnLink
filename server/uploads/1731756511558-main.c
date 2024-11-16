#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "user_management.c"
#include "product_management.c"
#include "history_tracking.c"
#include "recommendation_engine.c"

// Function to display the menu
void displayMenu() {
    printf("\n===== Menu =====\n");
    printf("1. Create New User\n");
    printf("2. Create New Product\n");
    printf("3. Add Product to User's History\n");
    printf("4. View User Browsing History\n");
    printf("5. Get Product Recommendations\n");
    printf("6. Exit\n");
    printf("Enter your choice: ");
}

int main() {
    UserTable userTable;
    ProductTable productTable;
    Graph historyGraph;

    initUserTable(&userTable);
    initProductTable(&productTable);
    initGraph(&historyGraph);

    int choice, userId, productId;
    char userName[50], productName[50], productCategory[30];

    // Add some products for testing
    addProduct(&productTable, 101, "Laptop", "Electronics");
    addProduct(&productTable, 102, "Smartphone", "Electronics");
    addProduct(&productTable, 201, "Shirt", "Clothing");
    addProduct(&productTable, 202, "Jeans", "Clothing");    
    addProduct(&productTable, 301, "Novel", "Books");

    while (1) {
        displayMenu();
        scanf("%d", &choice);
        getchar(); // To consume newline character after the integer input

        switch (choice) {
            case 1:
                // Create New User
                printf("Enter new user ID: ");
                scanf("%d", &userId);
                getchar();  // Consume newline character left by scanf
                printf("Enter user name: ");
                fgets(userName, 50, stdin);
                userName[strcspn(userName, "\n")] = '\0';  // Remove newline character
                addUser(&userTable, userId, userName);
                printf("User %s added successfully.\n", userName);
                break;

            case 2:
                // Create New Product
                printf("Enter product ID: ");
                scanf("%d", &productId);
                getchar();  // Consume newline character
                printf("Enter product name: ");
                fgets(productName, 50, stdin);
                productName[strcspn(productName, "\n")] = '\0';  // Remove newline character
                printf("Enter product category: ");
                fgets(productCategory, 30, stdin);
                productCategory[strcspn(productCategory, "\n")] = '\0';  // Remove newline character
                addProduct(&productTable, productId, productName, productCategory);
                printf("Product %s added successfully.\n", productName);
                break;

            case 3:
              // Add Product to User's History
              printf("Enter user ID to add product to: ");
              scanf("%d", &userId);

              // Get the product ID and fetch product details to get its category
              printf("Enter product ID to add to user: ");
              scanf("%d", &productId);

              // Get the product's category
              Product *product = getProduct(&productTable, productId);
              if (product != NULL) {
                  addEdge(&historyGraph, userId, productId, product->category);  // Pass category here
                  printf("Product with ID %d and category '%s' added to user with ID %d.\n", productId, product->category, userId);
              } else {
                  printf("Product with ID %d not found.\n", productId);
              }
              break;

            case 4:
                // View User Browsing History
                printf("Enter user ID to view browsing history: ");
                scanf("%d", &userId);
                printBrowsingHistory(&historyGraph, &productTable, userId);
                break;

            case 5:
                // Get Product Recommendations
                printf("Enter user ID to generate recommendations: ");
                scanf("%d", &userId);
                generateRecommendations(&historyGraph, &productTable, userId);
                break;

            case 6:
                // Exit
                printf("Exiting program...\n");
                return 0;

            default:
                printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}


