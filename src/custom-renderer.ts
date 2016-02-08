import {
    Inject,
    Injectable,
    Renderer,
    RootRenderer,
    RenderComponentType
} from 'angular2/core';

export type Widget = any;

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

    renderComponent(componentProto: RenderComponentType): Renderer {
        return this._rootRenderer.renderComponent(componentProto);
    }

    selectRootElement(selector: string): Widget {
        console.log('selectRootElement');
        const page = {nodeName: "Root"};
        return page;
    }

    createViewRoot(hostElement: Widget): Widget {
        console.log('createViewRoot', hostElement.nodeName);
        return hostElement;
    }

    projectNodes(parentElement: Widget, nodes: Widget[]): void {
        console.log('projectNodes');
    }

    attachViewAfter(anchorNode: Widget, viewRootNodes: Widget[]) {
        console.log('attachViewAfter', anchorNode.nodeName, anchorNode);
    }

    detachView(viewRootNodes: Widget[]) {
        console.log('detachView');
    }

    animateNodeEnter(node: Widget) {
    }

    animateNodeLeave(node: Widget) {
    }

    public destroyView(hostElement: Widget, viewAllNodes: Widget[]) {
        console.log("destroyView");
    }

    setElementProperty(renderElement: Widget, propertyName: string, propertyValue: any) {
        console.log("setElementProperty", renderElement.nodeName, propertyName, propertyValue);
    }

    setElementAttribute(renderElement: Widget, attributeName: string, attributeValue: string) {
        console.log("setElementAttribute", renderElement.nodeName, attributeName, attributeValue);
        return this.setElementProperty(renderElement, attributeName, attributeValue);
    }

    setElementClass(renderElement: Widget, className: string, isAdd: boolean): void {
        console.log("setElementClass", className, isAdd);
    }

    setElementStyle(renderElement: Widget, styleName: string, styleValue: string): void {
        console.log("setElementStyle", styleName, styleValue);
    }

    setBindingDebugInfo(renderElement: Widget, propertyName: string, propertyValue: string): void {
        console.log('setBindingDebugInfo: ' + renderElement.nodeName + ', ' + propertyName + ' = ' + propertyValue);
    }

    invokeElementMethod(renderElement: Widget, methodName: string, args: Array<any>) {
        console.log("invokeElementMethod " + methodName + " " + args);
    }

    setText(renderNode: any, text: string) {
        console.log("setText");
    }

    public createTemplateAnchor(parentElement: Widget): Widget {
        console.log('createTemplateAnchor');
    }

    public createElement(parentElement: Widget, name: string): Widget {
        console.log('createElement: ' + name + ' parent: ' + parentElement + ', ' + (parentElement ? parentElement.nodeName : 'null'));
        return {nodeName: name, parent: parentElement};
    }

    public createText(value: string): Widget {
        console.log('createText');
        return null;
    }

    public listen(renderElement: Widget, eventName: string, callback: Function): Function {
        console.log('listen: ' + eventName);
        return function() {};
    }

    public listenGlobal(target: string, eventName: string, callback: Function): Function {
        throw new Error('Not implemented.');
    }
}
