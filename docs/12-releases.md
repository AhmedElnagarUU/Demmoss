# Releases: versions, Docker images, git tags

One version number names the same code everywhere:

| Where | Name for version 1.2.0 |
|---|---|
| `package.json` `version` | `1.2.0` |
| git tag on `main` | `v1.2.0` |
| GitHub release | `v1.2.0` (change list generated from merged work) |
| Docker Hub image | `<DOCKERHUB_USERNAME>/bochke:1.2.0` (also moves `1.2`, `1`, `latest`) |

A published version never changes. A fix is a new version.

## Which number to raise (semantic versioning)

- **Patch** `1.0.0 → 1.0.1`: bug fixes, text or photo fixes. Nothing new for the visitor.
- **Minor** `1.0.1 → 1.1.0`: something new that works with the same `.env` (a new template, a new page, a design change).
- **Major** `1.1.0 → 2.0.0`: the server needs something new or different to run (a new or renamed env variable,
  a data change that needs a manual step). Write the step in the GitHub release notes.

## How to release

1. Work on a branch; CI must be green.
2. In the same branch, set the new number in `package.json` (`npm version 1.1.0 --no-git-tag-version` also updates the lockfile).
3. Merge into `main`.
4. Tag the merge commit on `main` and push the tag:
   ```bash
   git checkout main && git pull
   git tag -a v1.1.0 -m "v1.1.0"
   git push origin v1.1.0
   ```
5. The **Release** workflow (`.github/workflows/release.yml`) then:
   1. refuses the tag if it is not `vX.Y.Z`, does not match `package.json`, is not on `main`, or that version is already on Docker Hub;
   2. runs the same checks and E2E journeys as CI;
   3. builds the image from `Dockerfile` and pushes it to Docker Hub with the tags above;
   4. creates the GitHub release with the change list.

If a step fails, nothing is pushed. Fix on a branch, merge, and tag the **next** number. Never move a tag whose image
is on Docker Hub; a tag whose release pushed nothing may be deleted and created again on the fixed commit.

## Settings

- GitHub secrets of the **`production` environment** (Settings → Environments → production): `DOCKERHUB_USERNAME`,
  `DOCKERHUB_TOKEN` (Docker Hub access token with read and write). The release jobs run in that environment.
- Public settings (`NEXT_PUBLIC_*`) are baked into the pages at build time. They are the `ARG` defaults at the top
  of `Dockerfile`. Changing one is a commit and a new release.
- Secrets are never in the image (anyone who pulls an image can read what is inside it). They live in one file on the
  server, `.env.production`, and `docker-compose.yml` gives them to the container every time it starts or restarts.

## Run on the server (once)

In one folder on the VPS:

1. Copy `docker-compose.yml` from this repo.
2. Create `.env` (read by Compose, not by the app):
   ```bash
   DOCKERHUB_USERNAME=<your Docker Hub user>
   BOCHKE_VERSION=1.0.0
   ```
3. Create `.env.production` with `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET` (see `.env.example`;
   password without `$`). Then `chmod 600 .env.production`.
4. `docker compose up -d`. The container restarts by itself after a crash or a server reboot.

Update to a new version: change `BOCHKE_VERSION` in `.env`, then `docker compose pull && docker compose up -d`.

## Roll back

Set `BOCHKE_VERSION` back to the previous number and run `docker compose up -d`. The server pins an exact version
(not `latest`), so a rollback is changing one number.
