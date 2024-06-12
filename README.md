# Render 2024 Workshop: A Musical Introduction to Contentful 

This is the code for the example project for the 2024 Render introduction to Contentful workshop.  

![Screenshot of Year In Music example project](./docs/project-example-screenshot.png)

## Demo
[Year in  Music Live Demo](year-in-music-2024.vercel.app)

## How to use

Clone this repository or download the code to create your own version of this project.

## Configuration

### Step 1. Create an account and a space on Contentful

First, [create an account on Contentful](https://www.contentful.com/sign-up/).

After creating an account, create a new empty **space** from the [dashboard](https://app.contentful.com/) and assign to it any name of your liking. Or if you already have a space, you need to have at least one open content type slot. 

### Step 2. Create a content model

The [content model](https://www.contentful.com/developers/docs/concepts/data-model/) defines the data structures of your application/websites. The structures are flexible and you can tailor them to your needs.

For this example you need to create a content model that defines an author and a post content type. **You can create these two by running a script or by doing it manually** to familiarize yourself with the Contentful user interface.

#### Run a script to create the content model

This project includes a setup script which you can use to set up the content model expected by the source code.

In your Contentful dashboard go to **Settings > General Settings** and copy the **Space ID**.

Next, go to **Settings > API > Content management tokens** and create a new token by clicking **Generate personal token**. This token has the same access rights as the logged in user. **Do not share it publicly**, you will only use it to set up your space and can delete it afterwards.

With the space ID and management access token at hand run the following command:

```
npx cross-env CONTENTFUL_SPACE_ID=YOUR_SPACE_ID CONTENTFUL_MANAGEMENT_TOKEN=XXX npm run setup
```

This command will create the needed content structures and set up your Contentful space ready to use. The output should look as follows:

```
> cms-contentful@1.0.0 setup /Users/stefan.judis/Projects/next.js/examples/cms-contentful
> node ./contentful/setup.js $CONTENTFUL_SPACE_ID $CONTENTFUL_MANAGEMENT_TOKEN

┌──────────────────────────────────────────────────┐
│ The following entities are going to be imported: │
├─────────────────────────────────┬────────────────┤
│ Content Types                   │ 2              │
├─────────────────────────────────┼────────────────┤
│ Editor Interfaces               │ 2              │
├─────────────────────────────────┼────────────────┤
│ Locales                         │ 1              │
├─────────────────────────────────┼────────────────┤
│ Webhooks                        │ 0              │
├─────────────────────────────────┼────────────────┤
│ Entries                         │ 0              │
├─────────────────────────────────┼────────────────┤
│ Assets                          │ 0              │
└─────────────────────────────────┴────────────────┘
 ✔ Validating content-file
 ✔ Initialize client (1s)
 ✔ Checking if destination space already has any content and retrieving it (2s)
 ✔ Apply transformations to source data (1s)
 ✔ Push content to destination space
   ✔ Connecting to space (1s)
   ...
   ...
   ...
```

#### Create the content model manually

##### Create an `Album` content type

From your contentful space, go to **Content model** and add a new content type:

- Give it the **Name** `Album`, the **Api Identifier** should be `album`

Once the content model is saved, add these fields (you don't have to modify the settings unless specified):

- `Name` - **Text** field (type **short text**). 
- `Slug` - **Text** field. Go to the settings of this field, and under **Appearance**, select **Slug** to display it as a slug of the `title` field.
- `Album Cover` - **Media** field (type **one file**). 
- `Release Year` - **Number** field
- `Artist Name` - **Text** field (type **short text**). 
- `Favorite Month` - **Date** field
- `Thoughts` - **Rich text** field
- `Favorite` - **Boolean** field. 

Save the content type and continue.

### Step 3. Validate your content model

After setting up the content model (either manually or by running `npm run setup` or `yarn setup`), it should look as follows.

**Content model overview**

![Content model overview](./docs/content-model-example-images.png)

### Step 4. Populate Content

Go to the **Content** section in your space, then click on **Add entry** and select the **Album** content type:

- You just need **2 album entries**.
- For album information use a website like Wikipedia or Last FM. 

**Important:** For each entry and asset, you need to click on **Publish**. If not, the entry will be in draft state.

![Published content entry](./docs/published-entry-example.png)

### Step 5. Set up environment variables

From your contentful space, go to **Settings > API keys**. There will be an example Content delivery / preview token - you can use these API keys. (You may also create a new key.)

Next, copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `CONTENTFUL_SPACE_ID` should be the **Space ID** field of your API Key
- `CONTENTFUL_ACCESS_TOKEN` should be the **[Content Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/) - access token** field of your API key
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN` should be the **[Content Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/) - access token** field of your API key
- `CONTENTFUL_PREVIEW_SECRET` should be any value you want. It must be URL friendly as the dashboard will send it as a query parameter to enable Next.js Draft Mode
- - `CONTENTFUL_REVALIDATE_SECRET` should be any value you want. This will be the value you pass in as a secret header from the Contentful Webhook settings to use **[On-Demand Revalidation](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration#on-demand-revalidation)**

Your `.env.local` file should look like this:

```bash
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
CONTENTFUL_PREVIEW_ACCESS_TOKEN=...
CONTENTFUL_PREVIEW_SECRET=...
CONTENTFUL_REVALIDATE_SECRET=...
```

### Step 6. Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your project should be up and running on [http://localhost:3000](http://localhost:3000)! 

### Step 7. Try Draft Mode

In your Contentful space, go to **Settings > Content preview** and add a new content preview for development.

The **Name** field may be anything, like `Development`. Then, under **Content preview URLs**, check **Album** and set its value to:

```
http://localhost:3000/api/draft?secret=<CONTENTFUL_PREVIEW_SECRET>&slug={entry.fields.slug}
```

Replace `<CONTENTFUL_PREVIEW_SECRET>` with its respective value in `.env.local`.

![Content preview setup](https://github.com/vercel/next.js/assets/9113740/f1383d68-ea2b-4adf-974f-235b8c098745)

Once saved, go to one of the albums you've created and:

- **Update the name**. For example, you can add `[Draft]` in front of the name.
- The state of the post will switch to **CHANGED** automatically. **Do not** publish it. By doing this, the post will be in draft state.
- In the sidebar, you will see the **Open preview** button. Click on it!

![Content entry overview](./docs/preview-example.png)

You will now be able to see the updated title. To manually exit Draft Mode, you can navigate to `/api/disable-draft` in the browser.

### Step 8. Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.
