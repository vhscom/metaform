alias b := build
alias i := install

# list recipes by default
default:
  @just --list

# run supabase cli commands with bunx
supabase args='':
    bunx supabase {{args}}

# login to supabase
login: (supabase "login")

# generate supbabase type definitions
gen-types project='':
  bunx supabase gen types typescript --project-id {{project}} > database.types.ts

# install npm deps
install:
  bun install

# start dev server
dev:
  bun dev

# build with sveltekit
build:
  bun run build

# preview latest build
preview:
  bun run preview

# lint source files
lint:
  bun lint

# format source with prettier
format:
  bun format

# cleanup build files
clean:
  rm -rf node_modules
  rm -rf .svelte-kit

# run linter and check types
check:
  bun run check

# test api embeds by uuid singleton resource
test-api-embed-uuid uuid='627c63c2-eae9-4e36-9df5-33d32f04719c':
  curl -s http://localhost:5173/api/v1/embeds/{{uuid}}.json

# test api embeds by title singleton resource
test-api-embed-title title='Cloudflare':
  curl -s http://localhost:5173/api/v1/embeds/{{title}}.json

# test api pages collection resource
test-api-pages-collection:
  curl -s http://localhost:5173/api/v1/pages

# test api pages by uuid singleton resource
test-api-pages-uuid uuid='ddb93b1f-7387-4731-b3bb-6964cb1ef699':
  curl -s http://localhost:5173/api/v1/pages/{{uuid}}

# test api pages by title singleton resource
test-api-pages-title title='Cloudflare':
  curl -s http://localhost:5173/api/v1/pages/{{title}}

# test api
test-api: test-api-embed-uuid test-api-embed-title test-api-pages-collection test-api-pages-uuid test-api-pages-title

# test unit
test-unit:
  bun test

# run tests
test: test-unit test-api
