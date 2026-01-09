import { logger } from "@/lib/logger";

export const trackEvent = async (event: string, payload?: Record<string, unknown>) => {
  logger.info({ event, payload }, "analytics_event");
};
