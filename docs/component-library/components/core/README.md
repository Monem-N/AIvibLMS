# Core Components

Core components are foundational components that handle application-wide concerns such as initialization, configuration, and service integration. These components typically don't have a visual representation but provide essential functionality for the application.

## Components in this Category

- [HybridInitializer](./HybridInitializer.md): Initializes both Firebase and Supabase services
- [AuthProvider](./AuthProvider.md): Provides authentication context to the application
- [NotificationProvider](./NotificationProvider.md): Provides notification functionality to the application

## Usage Guidelines

Core components are typically used at the application root level and should be initialized before any feature-specific components. They provide context and services to the rest of the application.

Example of core component initialization order:

```tsx
<Provider store={store}>
  <HybridInitializer>
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <App />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  </HybridInitializer>
</Provider>
```

## Best Practices

1. **Initialization Order**: Pay attention to the order in which core components are initialized. Some components may depend on others being initialized first.

2. **Error Handling**: Core components should handle errors gracefully and provide meaningful error messages to users.

3. **Performance**: Since core components are initialized at the application root, they should be optimized for performance to avoid slowing down the application startup.

4. **Testing**: Core components should be thoroughly tested to ensure they work correctly in all scenarios.

5. **Documentation**: Core components should be well-documented, including their purpose, props, and usage examples.
