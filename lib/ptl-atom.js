'use babel';

import PtlAtomView from './ptl-atom-view';
import { CompositeDisposable } from 'atom';

export default
{
    ptlAtomView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state)
    {
        this.ptlAtomView = new PtlAtomView(state.ptlAtomViewState);
        this.modalPanel = atom.workspace.addRightPanel
        ({
            item: this.ptlAtomView.getElement(),
            visible: true
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add
        (
            atom.commands.add('atom-workspace',
                {
                    'ptl-atom:toggle': () => this.toggle()
                }
            )
        );
    },

    deactivate()
    {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.ptlAtomView.destroy();
    },

    serialize()
    {
        return
        {
            ptlAtomViewState: this.ptlAtomView.serialize()
        };
    },

    toggle()
    {
        console.log('PtlAtom was toggled!');
        return
        (
            this.modalPanel.isVisible() ?
            this.modalPanel.hide() :
            this.modalPanel.show()
        );
    }
};