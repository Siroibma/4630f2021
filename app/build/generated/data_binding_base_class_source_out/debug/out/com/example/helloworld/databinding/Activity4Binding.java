// Generated by view binder compiler. Do not edit!
package com.example.helloworld.databinding;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.viewbinding.ViewBinding;
import androidx.viewbinding.ViewBindings;
import com.example.helloworld.R;
import java.lang.NullPointerException;
import java.lang.Override;
import java.lang.String;

public final class Activity4Binding implements ViewBinding {
  @NonNull
  private final RelativeLayout rootView;

  @NonNull
  public final ScrollView scrollView1;

  private Activity4Binding(@NonNull RelativeLayout rootView, @NonNull ScrollView scrollView1) {
    this.rootView = rootView;
    this.scrollView1 = scrollView1;
  }

  @Override
  @NonNull
  public RelativeLayout getRoot() {
    return rootView;
  }

  @NonNull
  public static Activity4Binding inflate(@NonNull LayoutInflater inflater) {
    return inflate(inflater, null, false);
  }

  @NonNull
  public static Activity4Binding inflate(@NonNull LayoutInflater inflater,
      @Nullable ViewGroup parent, boolean attachToParent) {
    View root = inflater.inflate(R.layout.activity_4, parent, false);
    if (attachToParent) {
      parent.addView(root);
    }
    return bind(root);
  }

  @NonNull
  public static Activity4Binding bind(@NonNull View rootView) {
    // The body of this method is generated in a way you would not otherwise write.
    // This is done to optimize the compiled bytecode for size and performance.
    int id;
    missingId: {
      id = R.id.scrollView1;
      ScrollView scrollView1 = ViewBindings.findChildViewById(rootView, id);
      if (scrollView1 == null) {
        break missingId;
      }

      return new Activity4Binding((RelativeLayout) rootView, scrollView1);
    }
    String missingId = rootView.getResources().getResourceName(id);
    throw new NullPointerException("Missing required view with ID: ".concat(missingId));
  }
}
