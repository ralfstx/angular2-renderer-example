import {
    Inject,
    Injectable,
    Renderer,
    RootRenderer,
    RenderComponentType
} from 'angular2/core';

export class Element {
    constructor(private nodeName: string, private parent?: Element) {
        
    }
    toString() {
        return '<' + this.nodeName + '>';
    }
};

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

    selectRootElement(selector: string): Element {
        console.log('selectRootElement', selector);
        return new Element('Root');
    }

    createElement(parentElement: Element, name: string): Element {
        console.log('createElement', 'parent: ' + parentElement, 'name: ' + name);
        return new Element(name, parentElement);
    }

    createViewRoot(hostElement: Element): Element {
        console.log('createViewRoot', 'host: ' + hostElement);
        return hostElement;
    }

    createTemplateAnchor(parentElement: Element): Element {
        console.log('createTemplateAnchor', 'parent: ' + parentElement);
        return new Element('?');
    }

    createText(parentElement: Element, value: string): Element {
        console.log('createText', 'parent: ' + parentElement, 'value: ' + value);
        return new Element('text');
    }

    projectNodes(parentElement: Element, nodes: Element[]) {
        console.log('projectNodes', 'parent: ' + parentElement, 'nodes: ' + nodes.map(node => node.toString()));
    }

    attachViewAfter(node: Element, viewRootNodes: Element[]) {
        console.log('attachViewAfter', 'node: ' + node, 'viewRootNodes: ' + viewRootNodes.map(node => node.toString()));
    }

    detachView(viewRootNodes: Element[]) {
        console.log('detachView', 'viewRootNodes: ' + viewRootNodes.map(node => node.toString()));
    }

    destroyView(hostElement: Element, viewAllNodes: Element[]) {
        console.log('destroyView', 'host: ' + hostElement, 'viewAllNodes: ' + viewAllNodes.map(node => node.toString()));
    }

    setElementProperty(renderElement: Element, propertyName: string, propertyValue: any): void {
        console.log('setElementProperty', 'element: ' + renderElement, 'name: ' + propertyName, 'value: ' + propertyValue);
    }

    setElementAttribute(renderElement: Element, attributeName: string, attributeValue: string): void {
        console.log('setElementAttribute', 'element: ' + renderElement, 'name: ' + attributeName, 'value: ' + attributeValue);
        return this.setElementProperty(renderElement, attributeName, attributeValue);
    }

    listen(renderElement: Element, eventName: string, callback: Function): Function {
        console.log('listen', 'element: ' + renderElement, 'eventName: ' + eventName);
        return function() {};
    }

    listenGlobal(target: string, eventName: string, callback: Function): Function {
        console.log('listen', 'target: ' + target, 'eventName: ' + eventName);
        return function() {};
    }

    // Used only in debug mode to serialize property changes to comment nodes,
    // such as <template> placeholders.
    setBindingDebugInfo(renderElement: Element, propertyName: string, propertyValue: string): void {
        console.log('setBindingDebugInfo', 'element: ' + renderElement, 'name: ' + propertyName, 'value: ' + propertyValue);
    }

    setElementClass(renderElement: Element, className: string, isAdd: boolean): void {
        console.log('setElementClass', 'className' + className, 'isAdd: ' + isAdd);
    }

    setElementStyle(renderElement: Element, styleName: string, styleValue: string): void {
        console.log('setElementStyle', 'name: ' + styleName, 'value: ' + styleValue);
    }

    invokeElementMethod(renderElement: Element, methodName: string, args: Array<any>) {
        console.log('invokeElementMethod', 'name: ' + methodName, 'args: ' + args);
    }

    setText(renderNode: Element, text: string): void {
        console.log('setText', 'node: ' + renderNode, 'text: ' + text);
    }
}
