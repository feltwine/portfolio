/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface GithubOverview {
    }
}
declare global {
    interface HTMLGithubOverviewElement extends Components.GithubOverview, HTMLStencilElement {
    }
    var HTMLGithubOverviewElement: {
        prototype: HTMLGithubOverviewElement;
        new (): HTMLGithubOverviewElement;
    };
    interface HTMLElementTagNameMap {
        "github-overview": HTMLGithubOverviewElement;
    }
}
declare namespace LocalJSX {
    interface GithubOverview {
    }
    interface IntrinsicElements {
        "github-overview": GithubOverview;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "github-overview": LocalJSX.GithubOverview & JSXBase.HTMLAttributes<HTMLGithubOverviewElement>;
        }
    }
}
