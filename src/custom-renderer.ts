import {
    Inject,
    Injectable,
    Renderer,
    RootRenderer,
    RenderComponentType
} from 'angular2/core';
import * as tabris from 'tabris';

@Injectable()
export class CustomRootRenderer extends RootRenderer {
    private _registeredComponents: Map<string, CustomRenderer> = new Map<string, CustomRenderer>();

    renderComponent(componentProto: RenderComponentType): Renderer {
        var renderer = this._registeredComponents.get(componentProto.id);
        if (!renderer) {
            renderer = new CustomRenderer(this);
            this._registeredComponents.set(componentProto.id, renderer);
        }
        return renderer;
    }
}

@Injectable()
export class CustomRenderer extends Renderer {

    constructor(private _rootRenderer: CustomRootRenderer) {
        super();
        console.log('CustomRenderer created');
    }

    renderComponent(componentType: RenderComponentType): Renderer {
        return this._rootRenderer.renderComponent(componentType);
    }

    selectRootElement(selector: string): any {
        console.log('selectRootElement', selector);
        return null;
    }

    createElement(parentElement: any, name: string): any {
        var widget = tabris.create(name);
        if (parentElement) {
            widget.appendTo(parentElement);
        }
        return widget;
    }

    createViewRoot(hostElement: any): any {
        console.log('createViewRoot', 'host: ' + hostElement);
        return hostElement;
    }

    createTemplateAnchor(parentElement: any): any {
        console.warn('createTemplateAnchor', 'parent: ' + parentElement);
        return null;
    }

    createText(parentElement: any, value: string): any {
        if (value.trim() !== "") {
          console.warn('cannot set text outside of a widget', 'value: ' + value);
        }
        return null;
    }

    projectNodes(parentElement: any, nodes: any[]) {
        console.log('projectNodes', 'parent: ' + parentElement, 'nodes: ' + nodes.map(node => node.toString()));
    }

    attachViewAfter(node: any, viewRootNodes: any[]) {
        console.log('attachViewAfter', 'node: ' + node, 'viewRootNodes: ' + viewRootNodes.map(node => node.toString()));
    }

    detachView(viewRootNodes: any[]) {
        console.log('detachView', 'viewRootNodes: ' + viewRootNodes.map(node => node.toString()));
    }

    destroyView(hostElement: any, viewAllNodes: any[]) {
        console.log('destroyView', 'host: ' + hostElement, 'viewAllNodes: ' + viewAllNodes.map(node => node.toString()));
    }

    setElementProperty(renderElement: any, propertyName: string, propertyValue: any): void {
        console.log('setElementProperty', 'element: ' + renderElement, 'name: ' + propertyName, 'value: ' + propertyValue);
        renderElement.set(propertyName, propertyValue);
    }

    setElementAttribute(renderElement: any, attributeName: string, attributeValue: string): void {
        console.log('setElementAttribute', 'element: ' + renderElement, 'name: ' + attributeName, 'value: ' + attributeValue);
        return this.setElementProperty(renderElement, attributeName, attributeValue);
    }

    listen(renderElement: any, name: string, callback: Function): Function {
        console.log('listen', 'element: ' + renderElement, 'name: ' + name);
        let zonedCallback = (<any>global).zone.bind(callback);
        renderElement.on(name, zonedCallback);
        return () => renderElement.off(name, zonedCallback);
    }

    listenGlobal(target: string, name: string, callback: Function): Function {
        console.warn('Not implemented: listenGlobal', 'target: ' + target, 'name: ' + name);
        return () => {};
    }

    // Used only in debug mode to serialize property changes to comment nodes,
    // such as <template> placeholders.
    setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string): void {
        console.log('setBindingDebugInfo', 'element: ' + renderElement, 'name: ' + propertyName, 'value: ' + propertyValue);
    }

    setElementDebugInfo(renderElement: any, info: RenderDebugInfo): void {
        console.log('setElementDebugInfo', 'element: ' + renderElement, 'info: ' + info);
    }

    setElementClass(renderElement: any, className: string, isAdd: boolean): void {
        console.log('setElementClass', 'className' + className, 'isAdd: ' + isAdd);
    }

    setElementStyle(renderElement: any, styleName: string, styleValue: string): void {
        console.log('setElementStyle', 'name: ' + styleName, 'value: ' + styleValue);
    }

    invokeElementMethod(renderElement: any, methodName: string, args: any[]) {
        console.log('invokeElementMethod', 'name: ' + methodName, 'args: ' + args);
    }

    setText(renderNode: any, text: string): void {
        console.warn('text not supported outside of widgets', 'text: ' + text);
    }

}
