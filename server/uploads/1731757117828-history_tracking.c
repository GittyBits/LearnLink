#include <stdio.h>
#include <string.h>

#define MAX_HISTORY 100

typedef struct Edge {
    int productId;
    char category[30];  // Category should be stored in the Edge
} Edge;

typedef struct Graph {
    Edge edges[MAX_HISTORY];  // Store edges for user browsing history
    int count;
} Graph;

void initGraph(Graph *graph) {
    graph->count = 0;
}

// Modify the addEdge function to store category
void addEdge(Graph *graph, int userId, int productId, const char *category) {
    if (graph->count >= MAX_HISTORY) {
        printf("History graph is full.\n");
        return;
    }
    graph->edges[graph->count].productId = productId;
    strcpy(graph->edges[graph->count].category, category);  // Store category
    graph->count++;
}

void printBrowsingHistory(Graph *graph, ProductTable *productTable, int userId) {
    printf("Browsing history for user %d:\n", userId);
    for (int i = 0; i < graph->count; i++) {
        Product *product = getProduct(productTable, graph->edges[i].productId);
        if (product) {
            printf("- Product ID: %d, Name: %s, Category: %s\n", product->id, product->name, graph->edges[i].category);
        }
    }
}


