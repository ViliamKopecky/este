import Buttons from './buttons.react';
import PureComponent from '../components/component.react';
import Todo from './todo.react';
import immutable from 'immutable';
import React, {View, Text, ScrollView, Image} from 'react-native';

// Styles
import style from './list.style';

export default class List extends PureComponent {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    todos: React.PropTypes.instanceOf(immutable.List)
  }

  render() {
    const {
      actions,
      todos,
      msg
    } = this.props;

    const hasCompletedTodos = todos.count(todo => todo.completed) > 0;

    if (todos.size === 0)
      return (
        <View style={style.centeredView}>
          <Image
            source={require('image!Empty State')}
            style={style.icon}
          />
          <Text style={style.noTodosText}>
            {msg.empty}
          </Text>
        </View>
      );

    return (
      <ScrollView>
        {todos.map((todo, index) => {
          return (
            <View key={index} style={style.row}>
              <Todo
                disabled={false}
                onEndEditing={actions.onTodoEndEditing}
                onFieldChange={actions.onTodoFieldChange}
                onToggleCompleted={actions.toggleTodoCompleted}
                todo={todo}
              />
            </View>
          );
        })}
        <Buttons
          msg={msg.buttons}
          onAddRandomTodosClicked={actions.addHundredTodos}
          onClearAllClicked={!hasCompletedTodos ? actions.clearAllTodos : null}
          onClearCompletedClicked={hasCompletedTodos ? actions.clearCompletedTodos : null}
        />
      </ScrollView>
    );
  }

}
