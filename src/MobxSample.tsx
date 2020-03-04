import React, { Component } from 'react';

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

class CounterViewModel {
    @observable
    private _count: number = 0

    @action
    public increment(): void {
        this._count = this._count + 1
    }

    public get count(): number {
        return this._count
    }
}

type CounterViewProps = {
    model: CounterViewModel
}

@observer
class CounterView extends Component<CounterViewProps, {}>{

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <h1>Counter</h1>
                <p>Valor de counter {this.props.model.count}</p>
                <button onClick={() => this.props.model.increment()}>Increment</button>
            </React.Fragment>
        )
    }
}

export const CounterViewFunctional = observer((props: CounterViewProps) => (
    <React.Fragment>
        <h1>Counter</h1>
        <p>Valor de counter {props.model.count}</p>
        <button onClick={() => props.model.increment()}>Increment</button>
    </React.Fragment>
))




const counterViewModel = new CounterViewModel()

export default () => (
    <CounterView model={counterViewModel} />
)