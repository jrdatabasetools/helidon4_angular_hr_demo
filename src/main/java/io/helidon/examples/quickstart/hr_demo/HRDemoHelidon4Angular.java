
package io.helidon.examples.quickstart.hr_demo;

import java.util.concurrent.Executors;

import com.vaadin.open.Open;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.Initialized;
import jakarta.enterprise.event.Observes;

@ApplicationScoped
public class HRDemoHelidon4Angular {

  public void onStartup(@Observes @Initialized(ApplicationScoped.class) final Object event)
    throws InterruptedException
  {
    Executors.newCachedThreadPool().submit(() -> {
      Thread.sleep(3000);
      Open.open("http://localhost:8080");
      return null;
    });
  }
}
