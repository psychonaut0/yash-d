import yaml from 'js-yaml'
import config from '../../config/config.yml?raw'

export function getServices() {
  const doc = yaml.load(config)
  return doc
}