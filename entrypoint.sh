#!/bin/sh
chown -R appuser:appgroup /app/.data
exec su-exec appuser "$@"