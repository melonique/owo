# owo Marketplace App

## Introduction

At Owo, we are driven by projects with extraordinary impacts, aiming to transform human interactions to foster communication. The essence of the owo app transcends technology; it's a profoundly human endeavor to meet the long-neglected need for support, connection, and love, addressing the isolation that keeps us controllable and disconnected. Through technology, Owo seeks to break down the barriers, fostering connections and trust within communities, serving as a platform free of discrimination. This initiative is not just about technology but about enabling humans to feel empowered to initiate change for a better world.

Our platform differentiates itself by focusing on sharing, lending, and giving over buying and selling on an ultra-local scale, directly challenging competitors like Facebook Marketplace and Kijiji. Contributing to Owo means contributing to hope, to a future where humans are nourished and capable of improving our global situation.

### Why is this Open Source?

We've chosen to make the Owo Marketplace app open source to align with our core values of empowerment, inclusivity, and sustainability. While monetization is tempting, true adherence to our mission necessitates making the app as accessible as possible.

Open sourcing allows us to invite collaboration, leverage collective intelligence, and enhance the app's development beyond my individual coding capabilities.

This approach not only fosters innovation but also ensures that we stay true to our vision of promoting a circular economy and strong community connections globally. Ultimately, going open source maximizes the app's reach and impact, putting it into the hands of those who share our commitment to creating a more sustainable and connected world.


## Technical Overview

The Owo marketplace app is built with the following technologies and specifications:

- **Framework**: Next.js 13
- **APIs**: OpenAI for AI-driven features (Ensure your OpenAI API keys are added to the `.env` file)
- **Database**: Supabase for backend storage and authentication
- **Referenced Repositories**: Functions and operations are handled through the `owo-functions` repository for backend logic.

### Setup and Installation

1. **Clone the Repository**

```bash
git clone https://github.com/owo-marketplace/owo-app.git
cd owo-app
```


1. Install Dependencies
`npm install`
2. Configure Environment
Duplicate the .env.example file and rename it to .env. Fill in your OpenAI API keys and Supabase credentials:
```
OPENAI_API_KEY='your-api-key-here'
NEXT_PUBLIC_SUPABASE_URL=''
NEXT_PUBLIC_SUPABASE_ANON_KEY=''
```

3. Run the Development Server
`npm run dev`

The app will be accessible at http://localhost:3000.

## Contributing
We welcome contributions of all forms. Please feel free to fork the repository, make your changes, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

Ensure to adhere to our coding standards and commit message guidelines.

## Support
If you encounter any issues or have questions, please file an issue on the GitHub repository.

## License
This project is licensed under the MIT License - see the LICENSE file for details.




# Chatbot features
## TODO: File upload
files are uploader in the chatbot and stored in the storage in supabase.
offers/user-id/offer-id/file-uuid.extension

added to table /offer-images/offer-id - file-page - file-url - file-url-expire

