# @pipeworx/brazil-comex-stat

Brazil's monthly foreign trade statistics — exports and imports by NCM8 product
code, partner country, and Brazilian state — proxied live from MDIC Comex Stat.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1875+ live data sources. This is an independent, unofficial integration — not affiliated with, endorsed by, or published by the upstream provider.

## Tools

- `br_trade_flows(flow, ncm?, chapter?, country?, state?, from, to, monthly?)` —
  export/import value (USD FOB) and weight (kg) over a date range, filterable
  by product (NCM8 code or 2-digit chapter), partner country, and Brazilian
  state. Every code is resolved to its name in the response.
- `br_trade_top_partners(flow?, ncm?, chapter?, year, limit?)` — top partner
  countries for a product (or overall) in a given year, sorted by value.
- `br_trade_top_products(flow?, country, year, limit?)` — top NCM chapters
  Brazil traded with a given country in a given year, sorted by value.

## Auth

Keyless. The upstream API is public and unauthenticated but rate-limited
(observed: a request roughly every 10 seconds from a given IP); a tool call
may occasionally need a retry if it returns `MDIC Comex Stat: 429 ...`.

## Data sources

MDIC Comex Stat — Brazil's official foreign trade statistics system, run by
the Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC).
Figures come from Brazilian customs declarations (Receita Federal) and are
published monthly. This pack calls MDIC's own live query API per request; it
does not download, mirror, or store any trade figures — every response is
built from a fresh upstream call, with `data_as_of` set to the time of that
call. MDIC's data is published under Brazil's open-government-data policy
(Lei de Acesso à Informação, Lei 12.527/2011); attribute figures to MDIC /
Receita Federal.

Why this pack exists alongside `comtrade` (UN Comtrade, which already covers
Brazil): Comtrade reports Brazil at HS6, annually, with a multi-month lag.
Comex Stat is Brazil's own customs data at NCM8 (the national 8-digit tariff
code, finer than HS6), published monthly, and broken out by Brazilian state of
origin/destination — a dimension Comtrade does not have.

Country names are matched against MDIC's own (Portuguese) country list, with
common English aliases for major trading partners (e.g. "USA", "South Korea",
"UK"). Brazilian states accept either the full name or the two-letter UF
abbreviation (e.g. "Mato Grosso" or "MT"). NCM product codes must be the full
8-digit code; NCM/HS chapters are 2 digits (e.g. "12" = oilseeds and grains,
which covers soybeans — Brazil's single largest export).

A code or country/state name that does not resolve to anything in MDIC's own
tables raises an error naming what could not be resolved, rather than
returning a silent empty result — but a *valid* NCM/chapter code with
genuinely zero trade in the requested period will still return `row_count: 0`
/ an empty `rows`/`top_partners`/`top_products` array, since that is a true
answer from a working upstream call, not a failure.

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "brazil-comex-stat": {
      "url": "https://gateway.pipeworx.io/brazil-comex-stat/mcp"
    }
  }
}
```

### What this endpoint actually serves

`tools/list` at `https://gateway.pipeworx.io/brazil-comex-stat/mcp` returns the tools in the table
above **plus the shared Pipeworx meta-tools** — `ask_pipeworx`,
`discover_tools`, `search_within`, `remember`/`recall` and the rest of the
gateway-wide set. So the tool count you see is larger than this table: a
single-pack endpoint currently lists roughly 30 shared tools alongside the
pack's own. The connection's `initialize` response states its exact scope, and
is the authoritative answer for a given day.

This is deliberate, not multiplexing by accident. The meta-tools are what let a
scoped connection answer a question this pack does not cover — via
`ask_pipeworx`, which routes across the whole catalog — without you adding a
second MCP server. There is currently no way to mount a pack endpoint without
them; if the extra schemas cost you more context than the routing is worth,
connect to the full gateway once rather than to several pack endpoints.

Or connect to the full Pipeworx gateway to get every pack's tools listed
directly, instead of just this one's:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

Both URLs reach the same gateway and the same 1875+ data sources. The
only difference is which pack's tools are listed **directly**; `ask_pipeworx`
reaches all of them from either one.

## No MCP client? Call it over HTTP

```bash
curl -X POST https://gateway.pipeworx.io/v1/tools/br_trade_flows \
  -H 'Content-Type: application/json' \
  -d '{"flow":"export","ncm":"12019000","country":"China","from":"2025-01","to":"2025-12"}'
```

No account needed for the first calls. Inspect any tool: `GET https://gateway.pipeworx.io/v1/tools/br_trade_flows`. Find one: `POST https://gateway.pipeworx.io/v1/tools/search_packs` with `{"query":"..."}`.

## Standalone (no gateway account)

This package also runs as a local stdio MCP server — no Pipeworx account, no
gateway round-trip:

```json
{
  "mcpServers": {
    "brazil-comex-stat": {
      "command": "npx",
      "args": ["-y", "@pipeworx/mcp-brazil-comex-stat"]
    }
  }
}
```

Or run it directly to confirm it starts:

```bash
npx -y @pipeworx/mcp-brazil-comex-stat
```

It speaks MCP over stdin/stdout and answers `initialize`/`tools/list`/`tools/call`
for **only** this pack's tools — none of the shared meta-tools the gateway
connection above adds. Same source, same tools, no ask_pipeworx routing.

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English —
this works on the pack endpoint above as well as on the full gateway:

```
ask_pipeworx({ question: "your question about Brazil Comex Stat data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
