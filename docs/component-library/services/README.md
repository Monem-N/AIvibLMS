# Services

Services are reusable modules that provide functionality to components and other services in the AIvibLMS application. They handle business logic, data fetching, and integration with external services.

## Services in this Category

- [hybridService](./hybridService.md): Initializes and exports both Firebase and Supabase services
- [fileService](./fileService.md): Provides methods for file operations using Supabase Storage
- [authService](./authService.md): Provides methods for authentication using Firebase Authentication
- [databaseService](./databaseService.md): Provides methods for database operations using Firestore
- [notificationService](./notificationService.md): Provides methods for displaying notifications

## Hybrid Architecture Services

The following services are specifically designed for the hybrid Firebase/Supabase architecture:

- **[hybridService](./hybridService.md)**: Initializes and exports both Firebase and Supabase services
- **[fileService](./fileService.md)**: Provides methods for file operations using Supabase Storage while integrating with Firebase for authentication

These services implement the hybrid approach where Firebase is used for authentication and database operations, while Supabase is used for file storage.

## Usage Guidelines

Services should be used to encapsulate business logic and external service integration. When using services:

1. **Separation of Concerns**: Keep services focused on a specific concern
2. **Reusability**: Design services to be reusable across different parts of the application
3. **Testability**: Design services to be easily testable
4. **Error Handling**: Implement proper error handling in services
5. **Documentation**: Document services according to the standards in this library

## Best Practices

1. **Dependency Injection**: Use dependency injection to make services testable
2. **Error Handling**: Implement proper error handling in services
3. **Logging**: Log important events and errors in services
4. **Performance**: Optimize services for performance
5. **Security**: Implement proper security measures in services

## Example Usage

```tsx
import { uploadProfileImage } from 'services/fileService';
import { updateUserProfile } from 'services/authService';

const ProfilePage: React.FC = () => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const imageUrl = await uploadProfileImage(file);
      await updateUserProfile({ photoURL: imageUrl });
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };
  
  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
    </div>
  );
};
```
