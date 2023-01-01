import { LogSnag } from 'logsnag';

const logsnag = new LogSnag(process.env.LOGSNAG_API_TOKEN as string);

export const log = (channel: string, event: string, description: string, icon?: string) => {
  return logsnag.publish({
    project: 'nextacular',
    channel,
    event,
    description,
    icon: icon || '🔥',
    notify: true,
  });

}
