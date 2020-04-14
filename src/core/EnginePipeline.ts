namespace Kouky {
    export class EnginePipeline {
        private static _components: EnginePipelineComponent[] = [];
        private static _canvas: Canvas;

        private constructor() {}

        public static set canvas(value: Canvas) { EnginePipeline._canvas = value; }
        public static get canvas(): Canvas { return EnginePipeline._canvas; }

        public static addComponent(component: EnginePipelineComponent): void {
            EnginePipeline._components.push(component);
        }

        public static frame(time: Timestamp): void {
            EnginePipeline.update(time);
            EnginePipeline.render();
        }

        private static update(time: Timestamp): void {
            EnginePipeline.updateComponents(time);
        }

        private static render(): void {
            let context = Kouky.WebGLContext.gl;
            //context.viewport(0, 0, context.canvas.width, context.canvas.height);
            EnginePipeline._canvas.updateViewport();
            context.enable(context.DEPTH_TEST);
            //WebGLContext.clearColor = Color.blue();
            EnginePipeline._canvas.clear();
            EnginePipeline.renderComponents();
        }

        public static startComponents(): void {
            for(let component of EnginePipeline._components) {
                component.start();
            }
        }

        public static endComponents(): void {
            for(let component of EnginePipeline._components) {
                component.end();
            }
        }

        private static updateReady(): void {
            for(let component of EnginePipeline._components) {
                component.updateReady();
            }
        }

        private static updateComponents(time: Timestamp): void {
            for(let component of EnginePipeline._components) {
                component.update(time);
            }
        }

        private static renderComponents(): void {
            for(let component of EnginePipeline._components) {
                component.render();
            }
        }
    }
}