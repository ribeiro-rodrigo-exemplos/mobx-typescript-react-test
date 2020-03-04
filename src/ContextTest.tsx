import React, { createContext, Component, FunctionComponent, ReactNode, useContext } from 'react'

interface ThemeRepository {
    getTheme(): string
}

class ThemeRepositoryImpl implements ThemeRepository {
    private _theme: string = 'light'

    getTheme() {
        return this._theme
    }
}

class ThemeRepositoryMock implements ThemeRepository {
    getTheme() {
        return "dark"
    }
}

type themeContextType = {
    themeRepository?: ThemeRepository
}

const contextObject: themeContextType = {
    themeRepository: new ThemeRepositoryImpl()
}

const ThemeContext = createContext(contextObject)

export default class App extends Component<{}, {}>{
    public render(): ReactNode {

        return (
            <ThemeContext.Provider value={Object.assign(contextObject, { themeRepository: new ThemeRepositoryMock() })}>
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

function Toolbar(props: {}) {
    return (
        <div>
            <ThemeButton />
        </div>
    )
}

/*class ThemeButton extends Component<{}, {}>{
    
    static contextType = ThemeContext
    render() {
        return <div>{this.context}</div>
    }
}*/

const ThemeButton: FunctionComponent = () => {
    const context: themeContextType = useContext(ThemeContext)

    return (
        <h1>{context.themeRepository.getTheme()}</h1>
    )
}