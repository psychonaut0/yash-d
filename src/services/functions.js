import yaml from 'js-yaml'
import config from '../../config/config.yml?raw'

export function getServices() {
  const doc = yaml.load(config)
  return doc.services
}

export function filter(query, filterBy, src, mode) {
  let dest = src.filter(element => {
    if(mode === 'include') {
      return element[filterBy].toLowerCase().includes(query.toLowerCase())
    }
  })
  
  return dest
}