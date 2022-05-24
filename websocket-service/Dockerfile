FROM denoland/deno:alpine

WORKDIR /alpine

USER deno

ADD . .

CMD deno run --allow-net --allow-env server.ts
