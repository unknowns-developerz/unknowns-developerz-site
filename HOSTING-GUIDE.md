# Hosting Unknowns Developerz on a personal domain

## Recommended architecture

**Domain registrar / DNS → GitHub Pages → this static repository**

You do not need a paid web server for this site.

## 1. Choose a domain

Examples of brand-shaped names to check with a registrar:

- `unknownsdeveloperz.com`
- `unknownsdeveloperz.dev`
- `unknownsdev.com`

Do not assume any example is currently available until your registrar confirms it.

## 2. Create the GitHub repository

Create a repository under the GitHub account or organization that will own the brand, for example:

`unknowns-developerz-site`

Then push this folder:

```bash
git init
git add .
git commit -m "Launch Unknowns Developerz website"
git branch -M main
git remote add origin git@github.com:YOUR-ORG/unknowns-developerz-site.git
git push -u origin main
```

If SSH is not configured, use the repository's HTTPS remote instead.

## 3. Enable GitHub Pages

Repository → **Settings → Pages**

Under **Build and deployment**:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

Save and wait for the temporary GitHub Pages URL to appear.

## 4. Verify your domain with GitHub

For a GitHub organization:

Organization → **Settings → Pages → Add a domain**

GitHub will show a TXT record similar to:

`_github-pages-challenge-YOUR-ORG`

Add that TXT record at your DNS provider and keep it in DNS after verification.

## 5. Configure the custom domain in GitHub Pages

Repository → **Settings → Pages → Custom domain**

Enter your chosen apex domain, for example:

`unknownsdeveloperz.com`

Save it **before** pointing DNS at GitHub Pages.

## 6. Add DNS records

For an apex domain, add these four A records:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Also add:

| Type | Name | Value |
|---|---|---|
| CNAME | www | `YOUR-ORG.github.io` |

Point `www` directly to the GitHub Pages account/organization hostname, **not** to the repository path.

Optional IPv6 AAAA records can also be added from GitHub's current documentation.

Avoid wildcard DNS records such as `*.example.com` for GitHub Pages.

## 7. Enable HTTPS

After DNS has propagated and GitHub has provisioned the certificate:

Repository → **Settings → Pages → Enforce HTTPS**

DNS propagation and certificate availability can take time; GitHub documents that DNS changes can take up to 24 hours.

## 8. Update Time Manager

Once the site is live, use the clean privacy URL in Android:

```kotlin
val privacyPolicyUrl = "https://YOUR-DOMAIN/privacy/"
```

Use the exact same URL in the Google Play Console privacy-policy field.

## 9. Before publishing

Verify:

- `/` loads over HTTPS
- `/privacy/` loads over HTTPS without login
- `/support/` loads over HTTPS
- contact email opens correctly
- mobile layout works
- the privacy page accurately matches the app's current data handling

Whenever app data handling changes, update the privacy policy before or alongside that release.
