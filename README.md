# PicTeller

**PicTeller** is a marketing tool that allows users to transform product images, apply promotions, and special themes (such as Halloween or Christmas), and generate content ready to share on social media. With AI-generated descriptions, custom backgrounds, and promotional banners, **PicTeller** helps users create visually appealing content for marketing campaigns.

## Features

- **Image Upload**: Users can upload product images for customization.
- **Themes**: Automatically apply special themes like Halloween or Christmas to the images.
- **Promotions**: Add visual promotions such as "20% Off", "Buy 1 Get 1 Free", and more.
- **AI-Generated Descriptions**: Leverage AI to generate descriptions based on the product image and the selected theme.
- **Custom Backgrounds**: Automatically change image backgrounds to match the chosen theme.
- **Promotional Overlays**: Apply promotional banners to enhance the product image.
- **Social Media Formats**: Transform images into formats specifically tailored for platforms like Facebook, Instagram, TikTok, and X (formerly Twitter).

## Technologies Used

- **Next.js**: Framework used to build the user interface.
- **Cloudinary**: Service used for image management, including uploading, processing, and generating visual content.
- **OpenAI GPT**: Used to generate descriptions and narratives based on the uploaded images.
- **Zod**: Used for form validation and schema handling.
- **React Dropzone**: Utilized for drag-and-drop image upload functionality.
- **Tailwind CSS**: Used for responsive design and styling.

## Installation

To run the project locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/picteller.git

2. Install dependencies:

  ```bash
  cd picteller
  npm install
  ```

3. Set up environment variables. Create a .env.local file in the root directory of the project with the following variables:

  ```bash

  CLOUDINARY_CLOUD_NAME=your-cloud-name
  CLOUDINARY_API_KEY=your-api-key
  CLOUDINARY_API_SECRET=your-api-secret
  NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
  ```

4. Run the development server:

  ```bash
  npm run dev
  ```

The project will be available at http://localhost:3000.

## Usage

1. Upload an Image
Users can drag and drop a product image they want to customize.

2. Choose a Theme
Select a theme like "Halloween" or "Christmas" to apply a themed background and other visual elements to the image.

3. Apply a Promotion
Choose the type of promotion to display on the image, such as "20% Off" or "Buy 1 Get 1 Free".

4. AI-Generated Description
PicTeller will automatically generate a personalized description that matches the selected theme and the product image.

5. Download or Share
The customized image will be ready for download in the appropriate format for social media platforms like Facebook, Instagram, TikTok, and X.

## Future Features

- Support for additional themes (Black Friday, Valentine's Day, etc.).
- Advanced customization options for text and overlay styles.
- Integration with other image storage services.

## How to Contribute

If you'd like to contribute to PicTeller:

1. Fork the project.
2. Create a new branch for your feature (git checkout -b feature/new-feature).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature/new-feature).
5. Open a Pull Request.
   
## License

This project is licensed under the MIT License.

Contact
If you have any questions or suggestions, feel free to reach out
