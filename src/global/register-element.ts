import { App } from 'vue'
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElRow
} from 'element-plus'
const components = [ElButton, ElForm, ElFormItem, ElInput, ElRadio, ElRow]
export default function (app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
